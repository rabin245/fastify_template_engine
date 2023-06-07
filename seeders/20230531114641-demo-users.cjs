"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        username: "testuser1",
        email: "testuser1@email.com",
        password: bcrypt.hashSync("password1", 10),
        type: "local",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "testuser2",
        email: "testuser2@email.com",
        password: bcrypt.hashSync("password2", 10),
        type: "local",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "testuser3",
        email: "testuser3@email.com",
        password: bcrypt.hashSync("password3", 10),
        type: "local",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
