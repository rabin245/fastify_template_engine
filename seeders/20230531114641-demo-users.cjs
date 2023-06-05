"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        username: "testuser1",
        password: bcrypt.hashSync("password1", 10),
        type: "local",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "testuser2",
        password: bcrypt.hashSync("password2", 10),
        type: "local",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "testuser3",
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
