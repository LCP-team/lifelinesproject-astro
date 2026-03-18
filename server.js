import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 3e3;
async function bootstrap() {
  const app = express();
  let devVite;
  let prodTemplate = "";
  let prodRender;
  if (isProd) {
    const { default: sirv } = await import("sirv");
    app.use(sirv(path.join(__dirname, "dist/client"), { extensions: [] }));
    prodTemplate = fs.readFileSync(
      path.join(__dirname, "dist/client/index.html"),
      "utf-8"
    );
    const entryUrl = pathToFileURL(
      path.join(__dirname, "dist/server/entry-server.js")
    ).href;
    prodRender = (await import(entryUrl)).render;
  } else {
    const { createServer } = await import("vite");
    devVite = await createServer({
      server: { middlewareMode: true },
      appType: "custom"
    });
    app.use(devVite.middlewares);
  }
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template;
      let render;
      if (isProd) {
        template = prodTemplate;
        render = prodRender;
      } else {
        template = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
        template = await devVite.transformIndexHtml(url, template);
        const mod = await devVite.ssrLoadModule("/src/entry-server.ts");
        render = mod.render;
      }
      const { html: appHtml } = await render(url);
      const finalHtml = template.replace("<!--app-head-->", "").replace("<!--app-html-->", appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).send(finalHtml);
    } catch (e) {
      if (devVite) devVite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  });
  app.listen(port, () => {
    console.log(`[server] http://localhost:${port}`);
  });
}
bootstrap();
