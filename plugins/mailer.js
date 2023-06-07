import fastifyPlugin from "fastify-plugin";
import fastifyMailer from "fastify-mailer";

export default fastifyPlugin(async (fastify, opts) => {
  fastify.register(fastifyMailer, {
    defaults: {
      from: "EJS",
      subject: "EJS - Fastify",
    },
    transport: {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    },
  });
});
