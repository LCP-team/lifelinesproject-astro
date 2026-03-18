import app from "./app.js";
const port = Number(process.env.PORT) || 3002;
async function bootstrap() {
  app.listen(port, () => {
    console.log(`[server] http://localhost:${port}`);
  });
}
bootstrap();
