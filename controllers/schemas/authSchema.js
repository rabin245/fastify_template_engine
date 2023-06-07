export default {
  login: {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string", minLength: 2 },
        password: { type: "string", minLength: 2 },
      },
    },
  },
  signup: {
    body: {
      type: "object",
      required: ["username", "email", "password"],
      properties: {
        username: { type: "string", minLength: 2 },
        email: {
          type: "string",
        },
        password: { type: "string", minLength: 2 },
      },
    },
  },
};
