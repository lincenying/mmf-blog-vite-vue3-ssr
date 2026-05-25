import { routes } from '@/router/routes'

// 路由配置类型定义
interface RouteMeta {
    index?: number
    path?: string
}

interface RouteConfig {
    path: string
    name?: string
    component?: unknown
    redirect?: string | object
    meta?: RouteMeta
    beforeEnter?: AnyFn
    children?: RouteConfig[]
    [key: string]: unknown
}

// 扁平化匹配结果
interface MatchResult {
    route: RouteConfig
    params: Record<string, string>
}

/**
 * 将路径模式转换为正则表达式
 * @param pattern 路径模式，如 '/article/:id' 或 '/:catchAll(.*)'
 * @param isPrefix 是否仅匹配前缀（用于嵌套路由）
 * @returns 正则表达式
 */
function pathToRegexp(pattern: string, isPrefix: boolean = false): RegExp {
    // 转义正则特殊字符（除了 : 和 * 等我们有意处理的）
    let regexStr = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // 处理动态参数 :param 和 :param(正则)
    // 匹配 :param 或 :param(正则)
    regexStr = regexStr.replace(/:([a-z_]\w*)(?:\(([^)]+)\))?/gi, (_, name, regex) => {
        if (regex) {
            return `(?<${name}>${regex})`
        }
        return `(?<${name}>[^/]+)`
    })

    // 处理通配符 * (如果存在，转换为 .*)
    regexStr = regexStr.replace(/\*/g, '.*')

    // 确保精确匹配或前缀匹配
    if (isPrefix) {
        // 前缀匹配：要求匹配后要么结束，要么后跟 '/'
        regexStr = `^${regexStr}(?=/|$)`
    }
    else {
        regexStr = `^${regexStr}$`
    }

    return new RegExp(regexStr)
}

/**
 * 匹配单个路由路径（前缀匹配，用于嵌套）
 * @param pattern 路由的 path 模式
 * @param path 当前剩余路径
 */
function matchPath(pattern: string, path: string): { matched: boolean, remaining: string, params: Record<string, string> } {
    // 空路径或根路径特殊处理
    if (pattern === '/' && path === '/') {
        return { matched: true, remaining: '', params: {} }
    }

    const regex = pathToRegexp(pattern, true)
    const match = regex.exec(path)

    if (!match) {
        return { matched: false, remaining: path, params: {} }
    }

    // 提取匹配的字符串长度
    const matchedStr = match[0]
    let remaining = path.slice(matchedStr.length)

    // 如果剩余部分以 '/' 开头，去掉这个斜杠（因为子路由通常不以斜杠开头）
    if (remaining.startsWith('/')) {
        remaining = remaining.slice(1)
    }

    // 提取命名捕获组参数
    const params: Record<string, string> = {}
    if (match.groups) {
        Object.assign(params, match.groups)
    }

    return { matched: true, remaining, params }
}

/**
 * 递归匹配路由
 * @param routes 当前层级的路由配置数组
 * @param pathname 需要匹配的路径（不含 query/hash）
 * @returns 匹配到的路由及参数，若未匹配则返回 null
 */
function matchRouteRecursive(routes: RouteConfig[], pathname: string): MatchResult | null {
    for (const route of routes) {
        // 跳过没有 path 的路由（理论上不会出现）
        if (!route.path)
            continue

        // 尝试匹配当前路由
        const { matched, remaining, params } = matchPath(route.path, pathname)

        if (!matched) {
            continue
        }

        // 完全匹配（无剩余路径）
        if (remaining === '') {
            // 当前路由匹配成功，返回
            return { route, params }
        }

        // 有剩余路径，尝试匹配子路由
        if (route.children && route.children.length > 0) {
            const childMatch = matchRouteRecursive(route.children, remaining)
            if (childMatch) {
                // 合并参数（子路由参数覆盖父级同名参数）
                return { route: childMatch.route, params: { ...params, ...childMatch.params } }
            }
        }

        // 有剩余路径但无匹配的子路由，继续尝试同级其他路由（不将当前路由作为最终匹配）
        // 注意：Vue Router 中如果父路由匹配但剩余路径无子路由匹配，则视为未匹配
        continue
    }

    return null
}

/**
 * 主函数：判断 URL 是否符合路由规则（即是否能匹配到非 404 的有效路由）
 * @param url 完整的 URL 或路径字符串（如 '/article/123' 或 'http://example.com/article/123'）
 * @returns 是否匹配有效路由
 */
export function isValidRoute(url: string): boolean {
    // 提取路径部分（忽略协议、域名、查询参数、hash）
    let pathname: string
    try {
        // 尝试解析为完整 URL
        const parsed = new URL(url, 'http://placeholder.com')
        pathname = parsed.pathname
    }
    catch {
        // 如果解析失败，假定传入的就是路径字符串
        pathname = url.split('?')[0].split('#')[0]
    }

    // 确保路径以 '/' 开头
    if (!pathname.startsWith('/')) {
        pathname = `/${pathname}`
    }

    // 匹配路由
    const match = matchRouteRecursive(routes, pathname)

    if (!match) {
        return false
    }

    // 排除 404 兜底路由（name 为 '404' 或 path 为通配符捕获所有）
    const route = match.route
    if (route.name === '404' || route.path === '/:catchAll(.*)' || route.path === '*') {
        return false
    }

    return true
}
