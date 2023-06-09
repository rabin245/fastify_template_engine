import fastifyPlugin from "fastify-plugin";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import ConnectSessionSequelize from "connect-session-sequelize";

async function session(fastify, opts) {
  fastify.register(fastifyCookie);

  const SequelizeStore = ConnectSessionSequelize(fastifySession.Store);

  fastify.register(fastifySession, {
    cookieName: "sessionId",
    secret: "a secret with minimum length of 32 characters",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      expires: Date.now() + 15 * 60 * 1000,
      // sameSite: "none", // this is needed for cross-site cookies to work in browsers, but it can work only over HTTPS
    },

    expires: Date.now() + 15 * 60 * 1000,
    saveUninitialized: false, // don't create session until something stored
    store: new SequelizeStore({
      db: fastify.sequelize,
      table: "Sessions",
      checkExpirationInterval: 15 * 60 * 1000, // check for expired sessions every 5 minutes and delete them
    }),
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      if (!request.session.userId) {
        console.log("no userid found in session");
        throw new Error("No user logged in");
      }
      const User = request.server.User;
      const user = await User.findByPk(request.session.userId);

      if (!user) throw new Error("No such user exists");

      request.user = user;

      return;
    } catch (error) {
      console.log(error.message);

      if (error.message === "No user logged in")
        await reply.view("login.ejs", {
          errorMsg: error.message,
        });
      else
        reply.code(500).send({
          error: "Internal Server Error",
          msg: error.message,
        });
    }
  });

  fastify.decorate("authorize", async function (request, reply) {
    try {
      if (request.user.id != request.body.userId)
        throw new Error("Unauthorized");

      return;
    } catch (error) {
      console.log(error.message);
      if (error.message === "Unauthorized")
        reply
          .code(401)
          .send({ error: "Unauthorized", msg: "This is not your post" });
      else
        reply.code(500).send({
          error: "Internal Server Error",
          msg: error.message,
        });
    }
  });

  fastify.decorate("isLoggedIn", async function (request, reply) {
    try {
      if (request.session.userId) reply.redirect("/posts");
      return;
    } catch (error) {
      console.log(error.message);
      reply.code(500).send({
        error: "Internal Server Error",
        msg: error.message,
      });
    }
  });

  fastify.addHook("preValidation", async (request, reply) => {
    const isUserLoggedIn = request.session.userId;

    reply.locals = reply.locals || {};
    if (isUserLoggedIn) {
      reply.locals.isUserLoggedIn = true;
    } else {
      reply.locals.isUserLoggedIn = false;
    }
    return;
  });
}

export default fastifyPlugin(session);
