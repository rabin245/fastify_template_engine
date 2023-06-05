import usersHandler from "../controllers/handlers/usersHandler.js";
import usersSchema from "../controllers/schemas/usersSchema.js";

const getUsersOption = {
  schema: usersSchema.getUsers,
  handler: usersHandler.getUsers,
};

const createUserOption = {
  schema: usersSchema.createUser,
  handler: usersHandler.createUser,
};

export default async function (fastify, opts) {
  fastify.get("/users", getUsersOption);

  fastify.post("/users", createUserOption);
}
