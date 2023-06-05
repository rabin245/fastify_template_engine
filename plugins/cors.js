import fastifyPlugin from "fastify-plugin";
import cors from "@fastify/cors";

export default fastifyPlugin(async (fastify, opts) => {
  fastify.register(cors, {
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://localhost:3000",
      "https://accounts.google.com",
      "https://github.com",
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"], // speicifies which headers can be sent in the request
    exposedHeaders: ["Content-Length", "Set"], // specifies additional headers exposed to the client
    credentials: true, // indicates whether or not the request can include user credentials like cookies, authorization headers or TLS client certificates
  });
});
