export default async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    console.log("logging session token", request.session.token);
    console.log("logging session userid", request.session.userId);
    console.log("logging the test cookie", request.cookies);

    return { root: true, session: request.session };
  });
}
