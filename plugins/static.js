import fastifyPlugin from "fastify-plugin";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

export default fastifyPlugin(async (fastify, opts) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
    prefix: "/public/",
  });
});
