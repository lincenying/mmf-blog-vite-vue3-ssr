# 变更记录

## 2026-05-25 17:45:00

- `vite.config.components.ts` 为 `unplugin-vue-components` 增加 `dirs: ['src/components', 'src/layouts']`，修复前台页 `frontend-main-layout` 无法解析及连带 Anonymous 组件告警。

**commit message：**

```
fix: 将 layouts 纳入组件自动导入以解析 frontend-main-layout
```

## 2026-05-25 17:37:39

- `src/plugin` → `src/plugins`；`src/assets/scss` → `src/assets/styles`，同步更新入口与 README 引用。
- 新增 `layouts/backend-layout.vue`、`layouts/frontend-main-layout.vue`；删除 `pages/backend-index.vue`；前台首页/文章/关于/用户页改用主栏布局组件。
- 类型全面迁移为 `I` 前缀（`IArticle`、`IUser`、`IApiConfig` 等），移除 deprecated 别名；`server.dev/prod` 使用 `IRenderType`。
- `vite.config.components.ts` 增加 `src/layouts` 自动导入目录。

**commit message：**

```
refactor: 完成 plugins/styles/layouts 目录对齐与 I 前缀类型迁移
```

## 2026-05-25 17:30:13

- 目录对齐规范：`src/pinia` → `src/stores`；`src/router.ts` 拆为 `router/index.ts`、`router/routes.ts`、`router/guards.ts`；`src/types.ts` 拆为 `types/api.ts`、`types/domain.ts`、`types/store.ts`、`types/ssr.ts` 并通过 `types/index.ts` 统一导出（保留 `Article`、`User` 等兼容别名）。
- `src/app.vue` 重命名为 `App.vue`；`src/api/url.js` 改为 TypeScript `url.ts`。
- 新增 `IApiResponse` 等 `I` 前缀类型；`composables/useLockFn` 使用泛型替代 `any`；`client-only` 改为 `<script setup>` + 模板实现。
- 更新 `vite.config.components.ts` auto-import 目录、`auto-imports.d.ts` 路径及 README 中 API 地址说明。

**commit message：**

```
refactor: 对齐项目目录规范并拆分 types/router/stores
```

## 2026-05-20 15:39:58

- 重写根目录 `README.md`：与当前 `package.json` 脚本、技术栈、环境变量、Docker / Compose 用法对齐；中文说明改为仓库内 `README_CN.md` 相对链接；修正 `docker-compose -f … up` 命令顺序；补充 `lint:ts` / `generate` 等脚本说明。
- 新增 `README_CN.md`：与英文版结构对应的简体中文说明（原仓库中无该文件，旧 README 指向的 `docs/README_CN.md` 不存在）。

**commit message：**

```
docs: 优化 README 并新增中文版说明
```

## 2026-05-20 15:31:50

- `package.json`：`build:server:entry` 为 tsup 增加 `--external ./server/entry-server.js`，避免 esbuild 在打包时解析 Vite 才生成的 SSR 产物，修复 `Could not resolve "./server/entry-server.js"`。
- `server.prod.ts`：同步修正 `@ts-expect-error` 注释中的产物路径说明。

**commit message：**

```
build: tsup 将 SSR entry-server 标为 external 以通过构建
```

## 2026-05-20 15:23:23

- `src/entry-server.ts`：将已弃用的 `renderSSRHead(head)` 改为 `head.render()`（Unhead v3 推荐用法），消除弃用告警，行为与原先 SSR head 输出一致。

**commit message：**

```
fix: 使用 head.render 替代弃用的 renderSSRHead
```

## 2026-05-20 15:10:26

- 抽取 `server-url-guard.ts`：与开发/生产服务共用的 URL 校验中间件，对外统一返回中性错误文案。
- 新增 `server-ssr-error.ts`：SSR 路由异常时写回 HTML，生产环境（`NODE_ENV=production`）不输出堆栈。
- `server.prod.ts`：`createServer` 内单次加载 `entry-server` 的 `render`；HTML 响应使用 `render` 返回的 `statusCode`；请求体限制改为 `10mb`；支持 `TRUST_PROXY=1` 设置 `trust proxy`。
- `server.dev.ts`：复用 URL 守卫与 SSR 错误处理；Chokidar 轮询仅在 `SSR_CHOKIDAR_USEPOLLING=1` 时启用；请求体限制 `10mb`；修复 `vite` 在 catch 中可能未定义的检查（直接使用 `vite.ssrFixStacktrace`）。
- `server.middleware.ts`：限流命中时返回 HTTP `429` 与 `Retry-After`；修正 `skipExt` 中 `.jpg` 拼写。
- `src/entry-server.ts`：`req` 可选以兼容 `prerender`；`asyncData` 失败向上抛出；根据路由返回 `statusCode`（含 404）；修正 `ctx.modules` 与 `Set` 的兼容。
- `src/types.ts`：`RenderType` 增加 `statusCode`；`CusRouteComponent.asyncData` 改为可选；`AsyncDataConfig.req` 使用 `express.Request` 类型。

---

**本次改动 commit message（`global-09-commit.mdc`）：**

```
refactor: 优化 SSR 服务安全与错误处理

- 抽取 URL 守卫、统一 SSR 500 响应（生产不暴露堆栈）
- 生产单次加载 render、404 状态码、限流返回 429
- 收紧 body 限制、可选 chokidar 轮询、修正 skipExt 与类型
```
