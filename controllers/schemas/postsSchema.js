const postSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    title: { type: "string" },
    content: { type: "string" },
    userId: { type: "string" },
    user: {
      type: "object",
      properties: {
        username: { type: "string" },
      },
    },
  },
};

const idParamSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "number" },
  },
};

const postJsonBodySchema = {
  type: "object",
  required: ["title", "userId"],
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    userId: { type: "string" },
  },
};

export default {
  getPosts: {
    response: {
      200: {
        type: "array",
        items: postSchema,
      },
    },
  },
  getPostById: {
    params: idParamSchema,
    response: {
      200: postSchema,
    },
  },
  createPost: {
    body: postJsonBodySchema,
    response: {
      200: postSchema,
    },
  },
  deletePost: {
    params: idParamSchema,
    response: {
      200: postSchema,
    },
  },
  updatePost: {
    params: idParamSchema,
    body: postJsonBodySchema,
    response: {
      200: postSchema,
    },
  },
};
