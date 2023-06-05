import postsHandler from "../controllers/handlers/postsHandler.js";
import postsSchema from "../controllers/schemas/postsSchema.js";

export default async function (fastify, opts) {
  const getPostsOption = {
    schema: postsSchema.getPosts,
    onRequest: fastify.csrfProtection,
    preHandler: fastify.authenticate,
    handler: postsHandler.getPosts,
  };

  const getPostsByIdOption = {
    schema: postsSchema.getPostById,
    preHandler: fastify.authenticate,
    handler: postsHandler.getPostById,
  };

  const createPostOption = {
    schema: postsSchema.createPost,
    preHandler: fastify.authenticate,
    handler: postsHandler.createPost,
  };

  const deletePostOption = {
    schema: postsSchema.deletePost,
    preHandler: [fastify.authenticate, fastify.authorize],
    handler: postsHandler.deletePost,
  };

  const updatePostOption = {
    schema: postsSchema.updatePost,
    preHandler: [fastify.authenticate, fastify.authorize],
    handler: postsHandler.updatePost,
  };

  fastify.get("/posts", getPostsOption);

  fastify.get("/posts/:id", getPostsByIdOption);

  fastify.post("/posts", createPostOption);

  fastify.delete("/posts/:id", deletePostOption);

  fastify.put("/posts/:id", updatePostOption);
}
