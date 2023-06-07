export default async function (fastify, opts) {
  fastify.get(
    "/",
    {
      onRequest: fastify.isLoggedIn,
    },
    async function (request, reply) {
      await reply.view("index.ejs");
    }
  );
}
