import fp from "fastify-plugin";
import Sequelize, { DataTypes } from "sequelize";
import config from "../config/config.js";

import postModel from "../models/posts.js";
import userModel from "../models/users.js";
import sessionModel from "../models/sessionStore.js";

export default fp(async function (fastify, opts) {
  const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: config.development.dialect,
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const Post = postModel(sequelize, DataTypes);
    const User = userModel(sequelize, DataTypes);
    const Sessions = sessionModel(sequelize, DataTypes);

    User.hasMany(Post, { foreignKey: "userId" });
    Post.belongsTo(User, { foreignKey: "userId" });

    fastify.decorate("Post", Post);
    fastify.decorate("User", User);

    // await User.sync({ force: true });
    // await Post.sync({ force: true });
    // await User.sync({ alter: true });
    // await Post.sync({ alter: true });
    await User.sync();
    await Post.sync();
    await Sessions.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  fastify.decorate("sequelize", sequelize);
});
