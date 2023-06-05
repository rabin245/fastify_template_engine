const userSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    username: { type: "string" },
  },
};

export default {
  getUsers: {
    response: {
      200: {
        type: "array",
        items: userSchema,
      },
    },
  },
  createUser: {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
  },
};
