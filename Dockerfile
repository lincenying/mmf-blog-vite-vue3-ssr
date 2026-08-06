# 使用较小的基础镜像
ARG NODE_VERSION=node:22-alpine

# ---------- 构建阶段：安装全量依赖并编译 ----------
FROM $NODE_VERSION AS builder

RUN corepack enable && corepack prepare pnpm@11.17.0 --activate

WORKDIR /app

# 先复制依赖清单，利用 Docker 层缓存
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

# Vite 在构建时注入 import.meta.env；镜像构建上下文默认不含 .env，需显式设置
ENV NODE_ENV=production \
    VITE_APP_ENV=production \
    VITE_APP_API_DOMAIN=/ \
    VITE_APP_API=/

RUN pnpm build \
    && pnpm prune --prod \
    && sh scripts/docker-prune-node-modules.sh /app

# ---------- 运行阶段：仅 dist + 裁剪后的 node_modules ----------
FROM $NODE_VERSION AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 7777

USER node

CMD ["node", "./dist/server.js"]

# 第一次执行时, 如果node镜像拉不下来, 可以执行以下命令:
# docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
# docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine
# 构建镜像
# docker build -t lincenying/app-vue3-ssr:1.26.0806 -f ./Dockerfile .
# 运行容器
# docker run -d -p 7777:7777 --name app-vue3-ssr lincenying/app-vue3-ssr:1.26.0806
# 进入容器
# docker exec -it app-vue3-ssr /bin/sh
# 停止容器
# docker stop app-vue3-ssr
# 删除容器
# docker rm app-vue3-ssr
# 删除镜像
# docker rmi lincenying/app-vue3-ssr
