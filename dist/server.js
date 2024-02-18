// server.prod.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import requestIp from "request-ip";
import compression from "compression";
import serveStatic from "serve-static";
import { createProxyMiddleware } from "http-proxy-middleware";
import { UTC2Date } from "@lincy/utils";
async function createServer() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const resolve = (p) => path.resolve(__dirname, p);
  const indexProd = fs.readFileSync(resolve("client/index.html"), "utf-8");
  const manifest = JSON.parse(fs.readFileSync(resolve("client/.vite/ssr-manifest.json"), "utf-8"));
  const app = express();
  logger.token("remote-addr", (req) => {
    return requestIp.getClientIp(req) || "unknown";
  });
  logger.token("date", () => {
    return UTC2Date(void 0, "yyyy-mm-dd hh:ii:ss.SSS");
  });
  app.use(
    logger('[:remote-addr] [:date] ":method :url" :status :res[content-length] ":referrer"', {
      skip(req) {
        const skipExt = [".webmanifes", ".php", ".txt", ".map", ".js", ".css", ".png", "jpg", ".jpeg", ".gif", ".ttf", ".woff2", ".ico"];
        return skipExt.some((ext) => {
          return req.url.includes(ext);
        });
      }
    })
  );
  app.use(compression());
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.0.1:4000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api"
      },
      onProxyReq(proxyReq, req) {
        req.headers["X-Real-IP"] = requestIp.getClientIp(req) || "unknown";
      }
    })
  );
  app.use(
    serveStatic(resolve("client"), {
      index: false
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      const render = (await import("./server/entry-server.js")).render;
      const { html: appHtml, preloadLinks, headTags } = await render(url, manifest, req);
      const html = indexProd.replace("<!--preload-links-->", preloadLinks).replace("<!--app-html-->", appHtml).replace("<!--head-tags-->", headTags);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      const err = e;
      console.log(err.stack);
      res.status(500).end(err.stack);
    }
  });
  return { app };
}
var port = 7777;
createServer().then(({ app }) => app.listen(port, () => {
  console.log(`\u76D1\u542C: http://localhost:${port}`);
}));
export {
  createServer
};
