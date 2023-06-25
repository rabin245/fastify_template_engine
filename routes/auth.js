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

  const forgotPasswordOption = {
    schema: authSchema.forgotPassword,
    handler: authHandler.forgotPassword,
  };

  const forgotPasswordResetOption = {
    schema: authSchema.forgotPasswordReset,
    handler: authHandler.forgotPasswordReset,
  };

  const forgotPasswordResetPasswordOption = {
    schema: authSchema.forgotPasswordResetPassword,
    handler: authHandler.forgotPasswordResetPassword,
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

  fastify.get("/auth/forgot-password", async (req, reply) => {
    await reply.view("forgotPassword.ejs", {
      errorMsg: "",
    });
  });

  fastify.post("/auth/forgot-password", forgotPasswordOption);

  fastify.get("/auth/forgot-password/verify", async (req, reply) => {
    await reply.view("forgotPasswordVerify.ejs", {
      email: req.session.resetEmail,
    });
  });

  fastify.get("/auth/forgot-password/reset", forgotPasswordResetOption);

  fastify.get("/auth/forgot-password/reset-password", async (req, reply) => {
    await reply.view("forgotPasswordReset.ejs", {
      errorMsg: "",
      token: req.session.resetToken,
    });
  });

  fastify.post(
    "/auth/forgot-password/reset-password",
    forgotPasswordResetPasswordOption
  );
}
