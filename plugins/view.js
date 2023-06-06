import fastifyPlugin from "fastify-plugin";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import fastifyFormbody from "@fastify/formbody";

export default fastifyPlugin(async (fastify, opts) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  fastify.register(fastifyView, {
    engine: {
      ejs: ejs,
    },
    root: path.join(__dirname, "../templates"),
    layout: "layout.ejs",
    includeViewExtension: true,
  });

  fastify.register(fastifyFormbody);

  fastify.setNotFoundHandler(
    async (req, reply) => await reply.view("pageNotFound.ejs")
  );
});
