# mmf-blog（Vue 3 + Vite + SSR + PWA）

[English README](README.md)

**演示站点：** [http://www.mmxiaowu.com](http://www.mmxiaowu.com)

本项目为博客**前端**：支持 **SSR**、**PWA**，开发与生产均由 **Express** 承载；业务接口需配合独立部署的 **API 服务**。

## 技术栈

| 类别   | 技术                                                  |
| ------ | ----------------------------------------------------- |
| 框架   | Vue 3、Vue Router 4、Pinia、Element Plus              |
| 工程   | Vite、TypeScript；Node 侧使用 `tsx` / `tsup` 构建入口 |
| 样式   | UnoCSS、Sass                                          |
| SSR    | `@vue/server-renderer`、`@unhead/vue`                 |
| 离线   | `vite-plugin-pwa`（Workbox）                          |
| 服务端 | Express、compression、接口代理                        |

**包管理：** 使用 `pnpm`（版本见 `package.json` 中的 `packageManager` 字段）。

## 其他版本仓库

| 形态                              | 仓库                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------ |
| React（SPA）                      | [mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)           |
| React + Vite（SPA）               | [mmf-blog-vite-react](https://github.com/lincenying/mmf-blog-vite-react)       |
| Vue 2（SPA）                      | [mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)                   |
| Vue 2 + PWA + SSR                 | [mmf-blog-vue2-pwa-ssr](https://github.com/lincenying/mmf-blog-vue2-pwa-ssr)   |
| Vue 3（SPA）                      | [mmf-blog-vite-vue3](https://github.com/lincenying/mmf-blog-vite-vue3)         |
| **Vue 3 + PWA + SSR（当前仓库）** | [mmf-blog-vite-vue3-ssr](https://github.com/lincenying/mmf-blog-vite-vue3-ssr) |
| Nuxt 3                            | [mmf-blog-vite-nuxt](https://github.com/lincenying/mmf-blog-vite-nuxt)         |

## 后端 API

请先部署 **Express + TypeScript** 接口服务：

**[mmf-blog-api-ts](https://github.com/lincenying/mmf-blog-api-ts)**

未设置 `API_URL` 时，Node 侧默认请求 `http://127.0.0.1:4000`（见 `src/api/url.ts`）。开发环境下 Vite 会将 `/api` 代理到该地址（见 `vite.config.build.ts`）。

## 环境要求

- **Node.js** `>= 16.13.0`（Dockerfile 中常用 Node 22）
- **pnpm**（与 `package.json` 中声明的版本一致为佳）

## 安装

```bash
pnpm install
npx simple-git-hooks
```

第二行用于安装 Git 钩子（配合 `lint-staged`）；若团队用其他钩子方案可略过或替换。

## 常用命令

| 命令            | 说明                                                                    |
| --------------- | ----------------------------------------------------------------------- |
| `pnpm serve`    | 本地开发：Express + Vite，默认 **http://0.0.0.0:7777**                  |
| `pnpm build`    | 生产构建：客户端（含 SSR manifest）+ SSR bundle + 生成 `dist/server.js` |
| `pnpm start`    | 生产运行：`NODE_ENV=production node ./dist/server.js`                   |
| `pnpm generate` | 偏静态站点的构建流程（见 `prerender.ts`）                               |
| `pnpm lint`     | ESLint 检查                                                             |
| `pnpm lint:ts`  | `vue-tsc` 类型检查                                                      |
| `pnpm lint:fix` | ESLint 自动修复                                                         |
| `pnpm lint:css` | Stylelint                                                               |
| `pnpm workbox`  | 按 `workbox-config.js` 生成 Service Worker                              |

## 环境变量说明

| 变量                      | 作用范围          | 说明                                                                                  |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `VITE_APP_*`              | Vite 构建/开发    | 来自 `.env.development` / `.env.production`，如 `VITE_APP_API`、`VITE_APP_API_DOMAIN` |
| `API_URL`                 | Node（SSR、代理） | 后端 API 根地址；不设则默认 `http://127.0.0.1:4000`                                   |
| `TRUST_PROXY`             | 生产服务          | 设为 `1` 时在 Express 中开启 `trust proxy`（置于反向代理后时使用）                    |
| `SSR_CHOKIDAR_USEPOLLING` | 仅开发            | 设为 `1` 时在 Docker/虚拟机中可改善文件监听不稳定问题                                 |

## 本地访问地址

- 前台首页：[http://localhost:7777](http://localhost:7777)
- 后台登录：[http://localhost:7777/backend/login](http://localhost:7777/backend/login)

## Docker

### 1. 构建并运行 API 容器

克隆 [mmf-blog-api-ts](https://github.com/lincenying/mmf-blog-api-ts)，按其文档构建镜像并启动。本仓库 `Dockerfile` 中示例将宿主机 API 暴露端口写为 **4008**（`API_URL=http://host.docker.internal:4008`），请与实际端口一致。

### 2. 构建 Web 镜像

若拉取 `node:22-alpine` 较慢，可先镜像加速再打标签（与 `Dockerfile` 注释一致）：

```bash
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine
```

构建与运行（镜像标签请按需修改）：

```bash
docker build -t lincenying/images-mmf-blog-vite-vue3-ssr:1.25.1029 -f ./Dockerfile .
docker run -d -p 7777:7777 --add-host=host.docker.internal:host-gateway --name container-mmf-blog-vite-vue3-ssr lincenying/images-mmf-blog-vite-vue3-ssr:1.25.1029
```

维护常用命令：

```bash
docker exec -it container-mmf-blog-vite-vue3-ssr /bin/sh
docker stop container-mmf-blog-vite-vue3-ssr
docker rm container-mmf-blog-vite-vue3-ssr
docker rmi lincenying/images-mmf-blog-vite-vue3-ssr:1.25.1029
```

## Docker Compose

使用 `docker compose`（Compose V2）时，可从 Docker Hub 拉取 `api-server` 等镜像。若你已推送自己的 API 镜像，请修改 `docker-compose.yml` 中的 `api.image`。

MongoDB 数据目录映射示例：

```yaml
volumes:
  - /Users/yourname/web/mongodb/data:/data/db
```

构建并启动：

```bash
docker compose build
docker compose up -d
```

使用生产向 compose 文件（从仓库约定拉取镜像时；文件名与镜像以你实际为准）：

```bash
docker compose -f docker-compose.prod.yml up -d
```

**说明：** Compose V2 使用 `docker compose`（空格，Docker CLI 插件），已替代旧版独立命令 `docker-compose`；`-f` 须紧跟在子命令 **之前**，写成 `docker compose -f docker-compose.prod.yml up -d`。

## 开源协议

MIT
