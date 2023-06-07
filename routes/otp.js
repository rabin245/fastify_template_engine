import optHandler from "../controllers/handlers/otpHandler.js";
import optSchema from "../controllers/schemas/otpSchema.js";

export default async function (fastify, opts) {
  const otpPageOption = {
    handler: optHandler.otpPage,
  };

  const otpVerifyOption = {
    schema: optSchema.otpVerify,
    handler: optHandler.otpVerify,
  };

  fastify.get("/auth/login/verify", otpPageOption);
  fastify.post("/auth/login/verify", otpVerifyOption);
}
