export default {
  otpVerify: {
    body: {
      type: "object",
      required: ["otp"],
      properties: {
        otp: { type: "string" },
      },
    },
  },
};
