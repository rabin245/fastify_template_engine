import bcrypt from "bcrypt";
import { Op } from "sequelize";

export default {
  login: async (request, reply) => {
    const User = request.server.User;
    const { username, password } = request.body;
    const mailer = request.server.mailer;

    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }],
        },
      });
      if (!user)
        return await reply.view("login.ejs", {
          errorMsg: "Incorrect username or password",
        });

      const match = await bcrypt.compare(password, user.password);

      if (!match)
        return await reply.view("login.ejs", {
          errorMsg: "Incorrect username or password",
        });

      const otp = Math.floor(100000 + Math.random() * 900000);

      await user.update({ otp });

      mailer.sendMail({
        to: user.email,
        subject: "Single-use code for EJS Posts",
        html: `
          <p>Hi ${user.username},</p>
          
          <p>Your OTP for login is <b>${otp}</b></p>

          <p>Regards,</p>
          <p>EJS Posts Team</p>
          `,
      });

      request.session.userEmail = user.email;

      reply.redirect("/auth/login/verify");
    } catch (error) {
      console.log(error);
      reply.code(500).send({
        error: "Internal Server Error",
        msg: error.message,
      });
    }
  },
  signup: async (request, reply) => {
    const User = request.server.User;
    const { username, email, password } = request.body;

    const mailer = request.server.mailer;

    try {
      const user = await User.findOne({ where: { email } });
      if (user)
        return await reply.view("signup.ejs", {
          errorMsg: "User already exists",
        });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        username,
        email,
        password: hashedPassword,
        type: "local",
      });

      mailer.sendMail({
        to: email,
        subject: "Welcome to EJS Posts",
        html: `
          <p>Hi ${username},</p>
          
          <p>Thank you for signing up to EJS Posts. If you did not sign up, please ignore this email.</p>

          <p>Regards,</p>
          <p>EJS Posts Team</p>
          `,
      });

      reply.redirect("/auth/login");
    } catch (error) {
      console.log(error);
      reply.code(500).send({
        error: "Internal Server Error",
        msg: error.message,
      });
    }
  },
  logout: async (request, reply) => {
    try {
      if (!request.session.userId) throw new Error("No user logged in");

      await request.session.destroy();

      reply.redirect("/");
    } catch (error) {
      console.log(error.message);

      if (error.message === "No user logged in")
        reply.code(401).send({ error: error.message });
      else
        reply.code(500).send({
          error: "Internal Server Error",
          msg: error.message,
        });
    }
  },
};
