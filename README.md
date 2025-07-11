# mmf-blog vuejs 3.0 v3 [中文说明](https://github.com/lincenying/mmf-blog-vite-vue3/blob/main/doc/README_CN.md)

demo: [http://www.mmxiaowu.com](http://www.mmxiaowu.com)

The main technical stack: vue 3, vue-router 4, pinia, vitejs 5, unocss, eslint, pwa, ssr

---

#### Other versions

react(spa): [https://github.com/lincenying/mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)

react(hooks spa): [https://github.com/lincenying/mmf-blog-vite-react](https://github.com/lincenying/mmf-blog-vite-react)

vue2(spa): [https://github.com/lincenying/mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)

vue2(pwa ssr): [https://github.com/lincenying/mmf-blog-vue2-pwa-ssr](https://github.com/lincenying/mmf-blog-vue2-pwa-ssr)

vue3(spa): [https://github.com/lincenying/mmf-blog-vite-vue3](https://github.com/lincenying/mmf-blog-vite-vue3)

vue3(pwa ssr): [https://github.com/lincenying/mmf-blog-vite-vue3-ssr](https://github.com/lincenying/mmf-blog-vite-vue3-ssr)

nuxt3: [https://github.com/lincenying/mmf-blog-vite-nuxt](https://github.com/lincenying/mmf-blog-vite-nuxt)

---

First installation `api server`:

express-ts: https://github.com/lincenying/mmf-blog-api-ts

## Project setup

```bash
pnpm install & npx simple-git-hooks
```

### Compiles and hot-reloads for development

```bash
pnpm serve
```

### Compiles and minifies for production

```bash
pnpm build
```

### Preview for production

```bash
pnpm start
```

### Lints and fixes files

```bash
pnpm lint
```

## docker

### 1. 构建 api-server 容器

克隆 https://github.com/lincenying/mmf-blog-api-ts 仓库后, 按文档中的操作, 构建`api server`镜像, 并启动容器

### 2. 构建 web 容器

```bash
# 第一次执行时, 如果node镜像拉不下来, 可以执行以下命令:
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine
# 构建镜像
docker build -t lincenying/images-mmf-blog-vite-vue3-ssr:1.25.0414 -f ./Dockerfile .
# 运行镜像
docker run -d -p 7777:7777 --add-host=host.docker.internal:host-gateway --name container-mmf-blog-vite-vue3-ssr lincenying/images-mmf-blog-vite-vue3-ssr:1.25.0414
# 进入镜像
docker exec -it container-mmf-blog-vite-vue3-ssr /bin/bash
# 停止容器
docker stop container-mmf-blog-vite-vue3-ssr
# 删除容器
docker rm container-mmf-blog-vite-vue3-ssr
# 删除镜像
docker rmi images-mmf-blog-vite-vue3-ssr
```

## docker-compose

使用`docker-compose`, 将会从`docker hub`拉取`api-server`镜像, 并且启动容器
如果已经将`api-server`镜像传到`docker hub`, 修改`docker-compose.yml`中的`api.image`配置, 镜像改成自己的

```yaml
api:
  container_name: api-server
  image: lincenying/api-server:1.25.0414
```

修改`docker-compose.yml`中的`mongo.volumes`配置, 将宿主机数据库路径映射到容器中

```yaml
volumes:
  - /Users/lincenying/web/mongodb/data:/data/db
```

```bash
# 生成镜像及启动容器
docker-compose build
docker-compose up -d
```

```bash
# 自动从docker hub拉取mongodb, api-server, web-server镜像, 并启动运行容器
docker-compose up -d -f docker-compose.prod.yml
```

Home Site
http://localhost:7777

Login
http://localhost:7777/backend/login

# LICENSE

MIT
