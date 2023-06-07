import authHandler from "../controllers/handlers/authHandler.js";

export default async function (fastify, opts) {
  const authSchema = {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string", minLength: 2 },
        password: { type: "string", minLength: 2 },
      },
    },
  };

  const loginOption = {
    schema: authSchema,
    handler: authHandler.login,
  };

  const signupOption = {
    schema: authSchema,
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
