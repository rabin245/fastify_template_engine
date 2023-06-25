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
  forgotPassword: {
    body: {
      type: "object",
      required: ["email"],
      properties: {
        email: {
          type: "string",
        },
      },
    },
  },
  forgotPasswordReset: {
    querystring: {
      type: "object",
      required: ["token"],
      properties: {
        token: {
          type: "string",
        },
      },
    },
  },
  forgotPasswordResetPassword: {
    body: {
      type: "object",
      required: ["password", "token"],
      properties: {
        password: {
          type: "string",
        },
        token: {
          type: "string",
        },
      },
    },
  },
};
