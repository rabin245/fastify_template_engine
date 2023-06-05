"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users;",
      { type: Sequelize.QueryTypes.SELECT }
    );
    const posts = [
      {
        title: "Post 1",
        content: "Content 1",
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Post 2",
        content: "Content 2",
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Post 3",
        content: "Content 3",
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Post 4",
        content: "Content 4",
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("posts", posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
