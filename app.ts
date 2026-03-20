import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express, { Application } from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 3002;

type RenderFn = (
  url: string,
  cookies?: string,
) => Promise<{
  html: string;
  title?: string;
  cacheControl?: string;
  piniaState?: string;
}>;

const app: Application = express();

let devVite: import("vite").ViteDevServer | undefined;
let prodTemplate = "";
let prodRender: RenderFn | undefined;

if (isProd) {
  const { default: sirv } = await import("sirv");
  app.use(
    sirv(path.join(__dirname, "dist/client"), {
      extensions: [],
      maxAge: 2592000, // 30 days
    }),
  );

  prodTemplate = fs.readFileSync(
    path.join(__dirname, "dist/client/index.html"),
    "utf-8",
  );

  const entryUrl = pathToFileURL(
    path.join(__dirname, "dist/server/entry-server.js"),
  ).href;
  prodRender = (await import(entryUrl)).render as RenderFn;
} else {
  const { createServer } = await import("vite");
  devVite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(devVite.middlewares);
}

app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl;
    let template: string;
    let render: RenderFn;

    if (isProd) {
      template = prodTemplate;
      render = prodRender!;
    } else {
      template = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
      template = await devVite!.transformIndexHtml(url, template);
      const mod = await devVite!.ssrLoadModule("/src/entry-server.ts");
      render = mod.render as RenderFn;
    }

    const cookies = req.headers.cookie;
    const {
      html: appHtml,
      title,
      cacheControl,
      piniaState,
    } = await render(url, cookies);
    const stateScript = piniaState
      ? `<script id="pinia-state" type="application/json">${piniaState}</script>`
      : "";
    const finalHtml = template
      .replace("<!--app-title-->", title ?? "LifeLines Canada")
      .replace("<!--app-head-->", "")
      .replace("<!--pinia-state-->", stateScript)
      .replace("<!--app-html-->", appHtml);

    const headers: Record<string, string> = { "Content-Type": "text/html" };
    if (cacheControl) {
      headers["Cache-Control"] = cacheControl;
    }
    res.status(200).set(headers).send(finalHtml);
  } catch (e: unknown) {
    if (devVite) devVite.ssrFixStacktrace(e as Error);
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

export default app;
