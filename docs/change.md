# 变更记录

## 2026-08-06 14:24:22

- 首屏体积：从 `entry-client` 移除全局 `@kangc/v-md-editor` 注册与 `base-editor` CSS；新增 `ensureVMdEditor`，仅后台文章新增/编辑页按需加载。
- 构建拆包：`manualChunks` 将 `v-md-editor` / `prismjs` 排除出首屏 `vendor`（vendor 约 494KB → 235KB）。
- KeepAlive：`include` 改为组件 `name`（`FrontendIndex,FrontendAbout`），并去掉 KeepAlive 上的破坏性 `:key`。
- 清理：移除未使用依赖 `lodash` / `store2`；删除无效 `generate`/`workbox` 脚本、`prerender.ts`、`valid-route.ts`；去掉入口无用 `console.log`。

**commit message：**

```
perf: 懒加载 Markdown 编辑器并修复 KeepAlive 缓存
```

## 2026-07-31 15:55:00

- SSR cookies：仅将 `userid` / `username` / `useremail` 与登录标记 `user: '1'` 写入 Pinia，`user` / `b_user` token 不再进入 `__INITIAL_STATE__`。
- SSR API：优先转发原始 `Cookie` 头，附带客户端 IP / UA；请求失败降级为业务错误响应；超时改为 8s；剥离发往后端的 `cache` 参数；缓存 key 区分登录态。
- 鉴权：未登录访问 `/backend/*`、`/user/*` 改为 HTTP 302，开发/生产入口统一处理 redirect；登录态 HTML 增加 `Cache-Control: private, no-store`。
- 客户端：在 `router.isReady` / `mount` 前恢复 `__INITIAL_STATE__`，并用 `js-cookie` 同步公开 cookie 字段。

**commit message：**

```
perf: 优化 SSR cookies 注水与服务端 API 请求链路
```

## 2026-07-27 13:42:00

- `.dockerignore`：允许 `.env.production` 进入构建上下文。
- `Dockerfile`：构建阶段显式设置 `VITE_APP_ENV=production` 等变量，修复容器运行后 `当前环境: undefined`。

**commit message：**

```
fix: Docker 构建时注入 VITE_APP_ENV 修复环境显示 undefined
```

## 2026-07-27 13:30:00

- `Dockerfile`：多阶段构建优化——构建阶段 `pnpm prune --prod` 后裁剪 SSR 已打包依赖；运行阶段仅复制 `dist` + `node_modules`，移除 pnpm 与二次安装。
- 新增 `scripts/docker-prune-node-modules.sh`：删除 `element-plus`、`lodash`、`store2`、`vue-loading-overlay` 等运行时无需从 node_modules 加载的包。
- 扩充 `.dockerignore`，减少构建上下文体积；`README_CN.md` 补充镜像体积优化说明。

**commit message：**

```
build: 优化 Docker 多阶段构建以减小 app 镜像体积
```

## 2026-07-27 13:10:00

- 将 `express-rate-limit` 从 `devDependencies` 移至 `dependencies`（`catalog:node`），避免 tsup 将其及 `debug` 等依赖打进 ESM 产物后触发 `Dynamic require of "tty" is not supported`。
- `pnpm-workspace.yaml`：将 `express-rate-limit` 版本定义迁入 `catalog:node`。

**commit message：**

```
fix: 将 express-rate-limit 标为生产依赖以修复 dist/server.js 启动失败
```

## 2026-07-27 12:58:00

- `server.dev.ts`、`server.prod.ts`：将 `server.middleware` 裸模块导入改为相对路径 `./server.middleware`，修复 TypeScript 无法解析模块的问题。

**commit message：**

```
fix: 修正 server.middleware 模块导入路径
```

## 2026-07-23 17:24:27

- 将 `README.md`、`README_CN.md` 中 Docker Compose 相关命令由 v1（`docker-compose`）升级为 v2（`docker compose`）。
- 同步更新中文说明：标明 Compose V2 为 Docker CLI 插件，`-f` 仍须写在子命令之前。

**commit message：**

```
docs: 将 docker-compose 命令升级为 Compose V2
```

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
perf: 优化 SSR cookies 注水与服务端 API 请求链路
```
