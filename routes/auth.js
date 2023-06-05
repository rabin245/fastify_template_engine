import authHandler from "../controllers/handlers/authHandler.js";

export default async function (fastify, opts) {
  const loginOption = {
    schema: {},
    handler: authHandler.login,
  };

  const signupOption = {
    schema: {},
    handler: authHandler.signup,
  };

  const logoutOption = {
    schema: {},
    handler: authHandler.logout,
  };
  fastify.post("/auth/login", loginOption);
  fastify.post("/auth/signup", signupOption);
  fastify.post("/auth/logout", logoutOption);
}
