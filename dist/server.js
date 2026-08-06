// server.prod.ts
import fs from "fs";
import path from "path";
import process2 from "process";
import { fileURLToPath } from "url";
import { UTC2Date } from "@lincy/utils";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import logger from "morgan";
import requestIp3 from "request-ip";
import serveStatic from "serve-static";

// server.middleware.ts
import rateLimit from "express-rate-limit";
import requestIp from "request-ip";
var skipExt = [".webmanifest", ".txt", ".map", ".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ttf", ".woff2", ".ico"];
var staticPaths = [
  "/static/",
  "/assets/",
  "/src/",
  "/node_modules/",
  "/@"
];
var normalUserPatterns = [
  /mozilla.*firefox/i,
  /chrome.*safari/i,
  /safari/i
];
function checkSkip(path2) {
  for (const pattern of staticPaths) {
    if (path2.startsWith(pattern)) {
      return true;
    }
  }
  for (const ext of skipExt) {
    if (path2.endsWith(ext)) {
      return true;
    }
  }
  return false;
}
function checkUserAgent(userAgent) {
  return userAgent.includes("python-requests") || userAgent.includes("curl") || userAgent.includes("postman") || userAgent === "";
}
var mainLimiter = rateLimit({
  windowMs: 5 * 1e3,
  // 5秒钟
  max: (req) => {
    const userAgent = req.get("user-agent") || "";
    const isNormalBrowser = normalUserPatterns.some(
      (pattern) => pattern.test(userAgent)
    );
    if (isNormalBrowser) {
      return 20;
    }
    if (checkUserAgent(userAgent)) {
      return 2;
    }
    return 6;
  },
  standardHeaders: true,
  skip: (req) => {
    return checkSkip(req.path);
  },
  keyGenerator: (req) => {
    return requestIp.getClientIp(req) || "unknown";
  },
  handler: (req, res, _next, options) => {
    console.warn(`IP ${requestIp.getClientIp(req)} \u88AB\u9650\u5236\u8BBF\u95EE ${req.path}`);
    const retryAfterSec = Math.max(1, Math.ceil(options.windowMs / 1e3));
    res.status(429).set("Retry-After", String(retryAfterSec)).json({
      code: 429,
      error: "\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41",
      message: options.message,
      retryAfterSeconds: retryAfterSec,
      currentTime: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
});
var server_middleware_default = mainLimiter;

// server-html-cache.ts
import { LRUCache } from "lru-cache";
var HTML_CACHE_TTL_MS = 1e4;
var htmlCache = new LRUCache({
  max: 200,
  ttl: HTML_CACHE_TTL_MS
});
function isPublicCacheablePath(pathname) {
  if (!pathname || pathname === "") {
    return false;
  }
  if (pathname.startsWith("/backend") || pathname.startsWith("/user")) {
    return false;
  }
  if (/\.\w+$/.test(pathname)) {
    return false;
  }
  return true;
}
function createHtmlCacheKey(url) {
  return url.split("#")[0] || "/";
}
function canUseHtmlCache(req) {
  const method = req.method?.toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    return false;
  }
  if (req.cookies?.user || req.cookies?.b_user) {
    return false;
  }
  const pathname = (req.path || req.originalUrl.split("?")[0] || "/").split("#")[0];
  return isPublicCacheablePath(pathname);
}
function getCachedHtml(key) {
  return htmlCache.get(key);
}
function setCachedHtml(key, html, statusCode) {
  if (statusCode !== 200) {
    return;
  }
  htmlCache.set(key, { html, statusCode });
}

// server-ssr-error.ts
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function handleSsrRouteError(res, err, exposeStack) {
  const error = err instanceof Error ? err : new Error(String(err));
  console.error("[SSR]", error.stack || error.message);
  res.status(500).set({ "Content-Type": "text/html; charset=utf-8" });
  if (exposeStack) {
    const body = escapeHtml(error.stack || error.message);
    res.end(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"><title>500</title></head><body><pre>${body}</pre></body></html>`);
  } else {
    res.end('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"><title>\u9519\u8BEF</title></head><body><p>\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002</p></body></html>');
  }
}

// server-url-guard.ts
import requestIp2 from "request-ip";
var BLOCKED_EXTENSIONS = [".php", ".asp", ".jsp", ".jspx", ".aspx", ".ashx"];
var SENSITIVE_PATH_PREFIX = "/lincenying/";
function urlGuardMiddleware(req, res, next) {
  try {
    decodeURIComponent(req.url);
    const hitExt = BLOCKED_EXTENSIONS.some(
      (ext) => req.url.endsWith(ext) || req.url.includes(`${ext}?`)
    );
    if (hitExt || req.url.startsWith(SENSITIVE_PATH_PREFIX)) {
      throw new Error("blocked");
    }
    next();
  } catch {
    const ip = requestIp2.getClientIp(req) || "unknown";
    console.warn(`IP ${ip} \u88AB\u9650\u5236\u8BBF\u95EE ${req.url.substring(0, 200)}`);
    res.status(400).json({
      error: "bad_request",
      message: "\u8BF7\u6C42\u4E0D\u5408\u6CD5\u6216\u5305\u542B\u65E0\u6548\u5B57\u7B26",
      request_id: `${Date.now()}`,
      ip
    });
  }
}

// src/api/url.ts
import process from "process";
var API_BASE_URL = process.env.API_URL || "http://127.0.0.1:4000";
console.log(`\u5F53\u524DAPI\u5730\u5740: ${API_BASE_URL}`);
var url_default = API_BASE_URL;

// server.prod.ts
var BODY_PARSER_LIMIT = "1mb";
async function createServer() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const resolve = (p) => path.resolve(__dirname, p);
  const template = fs.readFileSync(resolve("client/index.html"), "utf-8");
  const manifest = JSON.parse(fs.readFileSync(resolve("client/.vite/ssr-manifest.json"), "utf-8"));
  const app = express();
  if (process2.env.TRUST_PROXY === "1") {
    app.set("trust proxy", 1);
  }
  app.use(urlGuardMiddleware);
  logger.token("remote-addr", (req) => {
    return requestIp3.getClientIp(req) || "unknown";
  });
  logger.token("date", () => {
    return UTC2Date(void 0, "yyyy-mm-dd hh:ii:ss.SSS");
  });
  app.use(
    logger('[:remote-addr] [:date] ":method :url" :status :res[content-length] ":referrer"', {
      skip(req) {
        return [...skipExt, ".php"].some((ext) => {
          return req.url.endsWith(ext);
        });
      }
    })
  );
  app.use(server_middleware_default);
  app.use(compression());
  app.use(
    createProxyMiddleware({
      target: url_default,
      changeOrigin: true,
      pathFilter: ["/api/**"],
      pathRewrite: {
        "^/api": "/api"
      },
      on: {
        proxyReq(proxyReq, req) {
          proxyReq.setHeader("x-real-ip", requestIp3.getClientIp(req) || "unknown");
        }
      }
    })
  );
  app.use(
    serveStatic(resolve("client"), {
      index: false
    })
  );
  app.use(express.json({ limit: BODY_PARSER_LIMIT }));
  app.use(express.urlencoded({ limit: BODY_PARSER_LIMIT, extended: true }));
  app.use(cookieParser());
  const { render } = await import("./server/entry-server.js");
  const exposeSsrStack = process2.env.NODE_ENV !== "production";
  app.use("/{*default}", async (req, res) => {
    try {
      const url = req.originalUrl;
      const useHtmlCache = canUseHtmlCache(req);
      const cacheKey = useHtmlCache ? createHtmlCacheKey(url) : "";
      if (useHtmlCache) {
        const cached = getCachedHtml(cacheKey);
        if (cached) {
          res.status(cached.statusCode).set({
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=10, s-maxage=10",
            "X-SSR-Cache": "HIT"
          }).end(cached.html);
          return;
        }
      }
      const { html: appHtml, preloadLinks, headTags, statusCode, redirect } = await render(url, manifest, req);
      if (redirect) {
        res.redirect(statusCode || 302, redirect);
        return;
      }
      const html = template.replace("<!--preload-links-->", preloadLinks).replace("<!--app-html-->", appHtml).replace("<!--head-tags-->", headTags);
      const headers = {
        "Content-Type": "text/html; charset=utf-8"
      };
      if (req.cookies?.user || req.cookies?.b_user) {
        headers["Cache-Control"] = "private, no-store";
      } else if (useHtmlCache && statusCode === 200) {
        setCachedHtml(cacheKey, html, statusCode);
        headers["Cache-Control"] = "public, max-age=10, s-maxage=10";
        headers["X-SSR-Cache"] = "MISS";
      }
      res.status(statusCode).set(headers).end(html);
    } catch (e) {
      handleSsrRouteError(res, e, exposeSsrStack);
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
