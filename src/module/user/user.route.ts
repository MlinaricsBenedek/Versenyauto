// user.route.ts
import { FastifyInstance } from "fastify";
import { UserController } from "./user.controller.js";
import { AuthController } from "./auth.controller.js";

export function registerUserRoutes(
  server: FastifyInstance,
  controller: UserController
) {
  server.post("/user", controller.registerUserHandler.bind(controller));
}

export function loginRoutes(
  server: FastifyInstance,
  controller: AuthController
) {
  server.post("/auth", controller.loginHandler.bind(controller));
}

export function getAllUserRoutes(
  server: FastifyInstance,
  controller: UserController
) {
  server.get("/user", controller.getAll.bind(controller));
}

export function getUserRoutes(
  server: FastifyInstance,
  controller: UserController
) {
  server.get("/user/:id", controller.get.bind(controller));
}

export function updateUserRoutes(
  server: FastifyInstance,
  controller: UserController
) {
  server.put("/user", controller.update.bind(controller));
}

export function deleteUserRoutes(
  server: FastifyInstance,
  controller: UserController
) {
  server.delete("/user/:id", controller.delete.bind(controller));
}
