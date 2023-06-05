import bcrypt from "bcrypt";

export default {
  login: async (request, reply) => {
    const User = request.server.User;
    const { username, password } = request.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user)
        reply.code(404).send({ error: "Incorrect username or password" });

      const match = await bcrypt.compare(password, user.password);

      if (!match)
        reply.code(401).send({ error: "Incorrect username or password" });

      request.session.userId = user.id;
      const csrfToken = await reply.generateCsrf();
      request.session.csrfToken = csrfToken;

      reply.send({
        message: "Login Success",
        csrf: csrfToken,
        session: request.session,
      });
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
      if (user) reply.code(409).send({ error: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        password: hashedPassword,
        type: "local",
      });

      reply.send({ message: "Signup Success", user: newUser });
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

      // destroys session in store
      await request.session.destroy();

      reply.send({ message: "Logout Success" });
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
