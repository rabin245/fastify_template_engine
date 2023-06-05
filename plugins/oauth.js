import fp from "fastify-plugin";
import oauthPlugin from "@fastify/oauth2";
import dotenv from "dotenv";
dotenv.config();

export default fp(async function (fastify, opts) {
  fastify.register(oauthPlugin, {
    name: "githubOAuth2",
    scope: ["user:email"],
    credentials: {
      client: {
        id: process.env.GITHUB_CLIENT_ID,
        secret: process.env.GITHUB_CLIENT_SECRET,
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION,
    },
    startRedirectPath: "/auth/login/github",
    callbackUri: "http://localhost:3000/auth/login/github/callback",
  });

  fastify.register(oauthPlugin, {
    name: "googleOAuth2",
    scope: ["profile", "email"],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/auth/login/google",
    callbackUri: "http://localhost:3000/auth/login/google/callback",
  });
});
