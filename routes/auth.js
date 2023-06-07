import authHandler from "../controllers/handlers/authHandler.js";
import authSchema from "../controllers/schemas/authSchema.js";

export default async function (fastify, opts) {
  const loginOption = {
    schema: authSchema.login,
    handler: authHandler.login,
  };

  const signupOption = {
    schema: authSchema.signup,
    handler: authHandler.signup,
  };

  const logoutOption = {
    handler: authHandler.logout,
  };

  fastify.get(
    "/auth/login",
    {
      onRequest: fastify.isLoggedIn,
    },
    async (req, reply) => {
      await reply.view("login.ejs", {
        errorMsg: "",
      });
    }
  );

  fastify.get(
    "/auth/signup",
    {
      onRequest: fastify.isLoggedIn,
    },
    async (req, reply) => {
      await reply.view("signup.ejs", {
        errorMsg: "",
      });
    }
  );

  fastify.post("/auth/login", loginOption);
  fastify.post("/auth/signup", signupOption);
  fastify.post("/auth/logout", logoutOption);
}
