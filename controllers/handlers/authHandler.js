import bcrypt from "bcrypt";
import { Op } from "sequelize";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

      const templatePath = path.join(__dirname, "../../templates/mail/otp.ejs");
      const template = await fs.readFile(templatePath, "utf-8");
      const compiledTemplate = ejs.render(template, {
        receiver: username,
        otp,
        email: user.email,
      });

      mailer.sendMail({
        to: user.email,
        subject: "Single-use code for EJS Posts",
        html: compiledTemplate,
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

      const templatePath = path.join(
        __dirname,
        "../../templates/mail/welcome.ejs"
      );
      const template = await fs.readFile(templatePath, "utf-8");
      const compiledTemplate = ejs.render(template, {
        receiver: username,
      });

      mailer.sendMail({
        to: email,
        subject: "Welcome to EJS Posts",
        html: compiledTemplate,
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
