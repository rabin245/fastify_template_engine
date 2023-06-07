export default {
  getPosts: async (request, reply) => {
    const Post = request.server.Post;
    const User = request.server.User;

    try {
      const posts = await Post.findAll({
        include: User,
      });

      if (posts.length === 0) {
        reply.view("posts.ejs", { posts });
      }
      await reply.view("posts.ejs", { posts });
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  },
  getPostById: async (request, reply) => {
    const Post = request.server.Post;
    const User = request.server.User;
    const { id } = request.params;

    try {
      const post = await Post.findByPk(id, {
        include: User,
      });

      if (!post) {
        await reply.view("pageNotFound.ejs");
      }

      await reply.view("post.ejs", { post, user: request.user });
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  },
  getPostsByUser: async (request, reply) => {
    const Post = request.server.Post;
    const User = request.server.User;

    const userId = request.user.id;

    try {
      const posts = await Post.findAll({
        where: { userId: userId },
        include: User,
      });

      if (posts.length === 0) {
        reply.view("posts.ejs", { posts });
      }

      await reply.view("posts.ejs", { posts });
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  },
  createPostPage: async (request, reply) => {
    await reply.view("createPost.ejs", {
      post: { id: "", title: "", content: "" },
    });
  },
  createPost: async (request, reply) => {
    const Post = request.server.Post;
    const { title, content } = request.body;
    const userId = request.user.id;

    try {
      const post = await Post.create({ title, content, userId });

      reply.redirect("/posts");
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  },
  deletePost: async (request, reply) => {
    const Post = request.server.Post;
    const User = request.server.User;
    const { id } = request.params;
    try {
      const post = await Post.findByPk(id, { include: User });

      if (!post) {
        reply.code(404).send({ error: "Not Found" });
      }

      await post.destroy();

      return post;
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  },
  updatePost: async (request, reply) => {
    const Post = request.server.Post;
    const User = request.server.User;
    const { id } = request.params;
    const { title, content } = request.body;
    try {
      const post = await Post.findByPk(id, { include: User });

      if (!post) {
        reply.code(404).send({ error: "Not Found" });
      }

      await post.update({ title, content });

      return post;
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  },
};
