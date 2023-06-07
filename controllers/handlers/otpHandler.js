export default {
  otpPage: async (request, reply) => {
    await reply.view("otp.ejs", {
      errorMsg: "",
    });
  },
  otpVerify: async (request, reply) => {
    const User = request.server.User;
    const { otp } = request.body;
    const email = request.session.userEmail;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return await reply.view("otp.ejs", {
          errorMsg: "Something went wrong",
        });
      }

      if (user.otp !== otp) {
        return await reply.view("otp.ejs", {
          errorMsg: "Incorrect OTP",
        });
      }

      await user.update({ otp: null });

      request.session.userId = user.id;

      reply.redirect("/posts");
    } catch (error) {
      console.log(error);
      reply.code(500).send({
        error: "Internal Server Error",
        msg: error.message,
      });
    }
  },
};
