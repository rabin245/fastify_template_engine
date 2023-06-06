import authHandler from "../controllers/handlers/authHandler.js";

export default async function (fastify, opts) {
  const loginOption = {
    schema: {
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string", minLength: 2 },
          password: { type: "string", minLength: 2 },
        },
      },
    },
    handler: authHandler.login,
  };

  const signupOption = {
    schema: {},
    handler: authHandler.signup,
  };

  const logoutOption = {
    handler: authHandler.logout,
  };

  fastify.get("/auth/login", async (req, reply) => {
    await reply.view("login.ejs", {
      errorMsg: "",
    });
  });

  fastify.post("/auth/login", loginOption);
  fastify.post("/auth/signup", signupOption);
  fastify.post("/auth/logout", logoutOption);
}
