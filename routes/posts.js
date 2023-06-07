import postsHandler from "../controllers/handlers/postsHandler.js";
import postsSchema from "../controllers/schemas/postsSchema.js";

export default async function (fastify, opts) {
  const getPostsOption = {
    schema: postsSchema.getPosts,
    preHandler: fastify.authenticate,
    handler: postsHandler.getPosts,
  };

  const getPostsByIdOption = {
    schema: postsSchema.getPostById,
    preHandler: fastify.authenticate,
    handler: postsHandler.getPostById,
  };

  const getPostsByUserOption = {
    preHandler: fastify.authenticate,
    handler: postsHandler.getPostsByUser,
  };

  const createPostOption = {
    schema: postsSchema.createPost,
    preHandler: fastify.authenticate,
    handler: postsHandler.createPost,
  };

  const createPostPageOption = {
    preHandler: fastify.authenticate,
    handler: postsHandler.createPostPage,
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

  fastify.get("/posts/me", getPostsByUserOption);

  fastify.get("/posts/new", createPostPageOption);

  fastify.post("/posts", createPostOption);

  fastify.delete("/posts/:id", deletePostOption);

  fastify.put("/posts/:id", updatePostOption);
}
