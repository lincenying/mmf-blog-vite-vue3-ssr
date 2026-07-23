# mmf-blog (Vue 3 + Vite + SSR + PWA)

[简体中文说明](README_CN.md)

**Demo:** [http://www.mmxiaowu.com](http://www.mmxiaowu.com)

Blog front-end with **server-side rendering**, **PWA**, and an **Express** dev/prod server. Pair it with the separate API project below.

## Tech stack

| Area    | Choice                                          |
| ------- | ----------------------------------------------- |
| UI      | Vue 3, Vue Router 4, Pinia, Element Plus        |
| Build   | Vite, TypeScript, `tsx` / `tsup` for Node entry |
| Styling | UnoCSS, Sass                                    |
| SSR     | `@vue/server-renderer`, `@unhead/vue`           |
| Offline | `vite-plugin-pwa` (Workbox)                     |
| Server  | Express, compression, proxy to API              |

**Package manager:** `pnpm@10` (see `package.json` → `packageManager`).

## Related repositories

| Variant                           | Link                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------ |
| React (SPA)                       | [mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)           |
| React + Vite (SPA)                | [mmf-blog-vite-react](https://github.com/lincenying/mmf-blog-vite-react)       |
| Vue 2 (SPA)                       | [mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)                   |
| Vue 2 + PWA + SSR                 | [mmf-blog-vue2-pwa-ssr](https://github.com/lincenying/mmf-blog-vue2-pwa-ssr)   |
| Vue 3 (SPA)                       | [mmf-blog-vite-vue3](https://github.com/lincenying/mmf-blog-vite-vue3)         |
| **Vue 3 + PWA + SSR (this repo)** | [mmf-blog-vite-vue3-ssr](https://github.com/lincenying/mmf-blog-vite-vue3-ssr) |
| Nuxt 3                            | [mmf-blog-vite-nuxt](https://github.com/lincenying/mmf-blog-vite-nuxt)         |

## API server

Run the backend first (Express + TypeScript):

**[mmf-blog-api-ts](https://github.com/lincenying/mmf-blog-api-ts)**

Default API base used by Node when `API_URL` is unset: `http://127.0.0.1:4000` (see `src/api/url.ts`). Vite dev proxies `/api` to the value resolved from that module / env.

## Prerequisites

- **Node.js** `>= 16.13.0` (Dockerfile / CI often use Node 22)
- **pnpm** (version pinned in `package.json`)

## Install

```bash
pnpm install
npx simple-git-hooks
```

(`simple-git-hooks` sets up git hooks used by `lint-staged`; adjust if your team uses another hook runner.)

## Scripts

| Command         | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| `pnpm serve`    | Dev: Express + Vite middleware, HMR, default **http://0.0.0.0:7777**               |
| `pnpm build`    | Production build: client (with SSR manifest) + SSR bundle + `dist/server.js` entry |
| `pnpm start`    | Run `NODE_ENV=production node ./dist/server.js`                                    |
| `pnpm generate` | Static-oriented build flow (see `prerender.ts`)                                    |
| `pnpm lint`     | ESLint                                                                             |
| `pnpm lint:ts`  | `vue-tsc` typecheck                                                                |
| `pnpm lint:fix` | ESLint with `--fix`                                                                |
| `pnpm lint:css` | Stylelint                                                                          |
| `pnpm workbox`  | Regenerate service worker via `workbox-config.js`                                  |

## Environment variables

| Variable                  | Where             | Meaning                                                                                         |
| ------------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| `VITE_APP_*`              | Vite              | Loaded from `.env.development` / `.env.production` (e.g. `VITE_APP_API`, `VITE_APP_API_DOMAIN`) |
| `API_URL`                 | Node SSR / proxy  | Upstream API origin; default `http://127.0.0.1:4000`                                            |
| `TRUST_PROXY`             | Production server | Set to `1` to enable `trust proxy` when behind a reverse proxy                                  |
| `SSR_CHOKIDAR_USEPOLLING` | Dev only          | Set to `1` if file watching inside Docker/VM is unreliable                                      |

## URLs (local)

- Site: [http://localhost:7777](http://localhost:7777)
- Admin login: [http://localhost:7777/backend/login](http://localhost:7777/backend/login)

## Docker

### 1. API container

Clone [mmf-blog-api-ts](https://github.com/lincenying/mmf-blog-api-ts), build and run its image per that project’s docs (e.g. expose API on the host port your web container expects — Dockerfile here documents `4008` as an example).

### 2. Web image

If pulling `node:22-alpine` is slow, you can mirror and retag (example from comments in `Dockerfile`):

```bash
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine
```

Build and run (replace image tag as needed):

```bash
docker build -t lincenying/images-mmf-blog-vite-vue3-ssr:1.25.1029 -f ./Dockerfile .
docker run -d -p 7777:7777 --add-host=host.docker.internal:host-gateway --name container-mmf-blog-vite-vue3-ssr lincenying/images-mmf-blog-vite-vue3-ssr:1.25.1029
```

Useful maintenance commands:

```bash
docker exec -it container-mmf-blog-vite-vue3-ssr /bin/sh
docker stop container-mmf-blog-vite-vue3-ssr
docker rm container-mmf-blog-vite-vue3-ssr
docker rmi lincenying/images-mmf-blog-vite-vue3-ssr:1.25.1029
```

## Docker Compose

`docker-compose.yml` can pull an `api-server` image from Docker Hub — set `api.image` to your own image if you publish one.

Map MongoDB data on the host, for example:

```yaml
volumes:
  - /Users/yourname/web/mongodb/data:/data/db
```

Build and start:

```bash
docker compose build
docker compose up -d
```

Prod-style compose (pulls prebuilt images — adjust file names/tags to match yours):

```bash
docker compose -f docker-compose.prod.yml up -d
```

## License

MIT
