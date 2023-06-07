import bcrypt from "bcrypt";

export default {
  login: async (request, reply) => {
    const User = request.server.User;
    const { username, password } = request.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user)
        await reply.view("login.ejs", {
          errorMsg: "Incorrect username or password",
        });

      const match = await bcrypt.compare(password, user.password);

      if (!match)
        await reply.view("login.ejs", {
          errorMsg: "Incorrect username or password",
        });

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
  signup: async (request, reply) => {
    const User = request.server.User;
    const { username, password } = request.body;

    try {
      const user = await User.findOne({ where: { username } });
      if (user) reply.view("signup.ejs", { errorMsg: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        password: hashedPassword,
        type: "local",
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
