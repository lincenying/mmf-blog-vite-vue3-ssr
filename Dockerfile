# 使用较小的基础镜像
ARG NODE_VERSION=node:18-alpine

# 生产环境镜像
FROM $NODE_VERSION AS production

# 安装 pnpm
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 使用pnpm安装依赖
RUN pnpm install --frozen-lockfile

# 编译项目
RUN pnpm build

# 设置环境变量
## 生产环境
ENV NODE_ENV=production
## 4008为api容器暴露给宿主机的端口, host.docker.internal 表示宿主机
ENV API_URL=http://host.docker.internal:4008

EXPOSE 7777

# 启动项目
CMD ["node", "./dist/server.js"]

# 构建镜像
# docker build -t images-mmf-blog-vite-vue3-ssr -f ./Dockerfile .
# 运行镜像
# docker run -d -p 7777:7777 --name container-mmf-blog-vite-vue3-ssr images-mmf-blog-vite-vue3-ssr
# 进入镜像
# docker exec -it container-mmf-blog-vite-vue3-ssr /bin/sh
# 停止容器
# docker stop container-mmf-blog-vite-vue3-ssr
# 删除容器
# docker rm container-mmf-blog-vite-vue3-ssr
# 删除镜像
# docker rmi images-mmf-blog-vite-vue3-ssr
