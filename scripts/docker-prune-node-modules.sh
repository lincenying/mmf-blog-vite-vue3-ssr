#!/bin/sh
# 移除已打进 SSR bundle、运行时无需从 node_modules 加载的包，减小镜像体积
set -eu

cd "${1:-/app}"

rm -rf \
    node_modules/.pnpm/element-plus@* \
    node_modules/.pnpm/vue-loading-overlay@*

pnpm store prune
