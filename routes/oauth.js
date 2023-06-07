import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function (fastify, opts) {
  fastify.get("/auth/login/github/callback", async (request, reply) => {
    try {
      const token =
        await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
          request
        );
      request.session.token = token;

      reply.redirect("/auth/login/github/verifyAccessToken");
    } catch (err) {
      console.log(err);
    }
  });

  fastify.get(
    "/auth/login/github/verifyAccessToken",
    async function (request, reply) {
      const accessToken = request.session.token.access_token;
      const clientId = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      try {
        const response = await axios.post(
          `https://api.github.com/applications/${clientId}/token`,
          { access_token: accessToken },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                clientId + ":" + clientSecret
              ).toString("base64")}`,
            },
          }
        );

        const { login, id } = response.data.user;
        const username = `${login}:${id}`;

        const user = await fastify.User.findOrCreate({
          where: { username: username },
          defaults: { username: username, password: id, type: "github" },
        });

        request.session.userId = user[0].id;

        reply.send(response.data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.get("/auth/login/google/callback", async (request, reply) => {
    try {
      const token =
        await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
          request
        );

      request.session.token = token;

      reply.redirect("/auth/login/google/verifyAccessToken");
    } catch (error) {
      console.log(error);
    }
  });

  fastify.get(
    "/auth/login/google/verifyAccessToken",
    async function (request, reply) {
      const accessToken = request.session.token.access_token;

      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { given_name, family_name, id } = response.data;
        const username = `${given_name}_${family_name}:${id}`;

        const user = await fastify.User.findOrCreate({
          where: { username: username },
          defaults: { username: username, password: id, type: "google" },
        });

        request.session.userId = user[0].id;

        reply.send(response.data);
      } catch (error) {
        reply.send(error);
      }
    }
  );
}
