export default {
  getUsers: async (request, reply) => {
    const User = request.server.User;
    try {
      const users = await User.findAll();

      if (users.length === 0) {
        reply.code(404).send({ error: "Not Found" });
      }

      return users;
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  },
  createUser: async (request, reply) => {
    const User = request.server.User;
    const { username, password } = request.body;
    try {
      const user = await User.create({ username, password });
      return user;
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  }
};
