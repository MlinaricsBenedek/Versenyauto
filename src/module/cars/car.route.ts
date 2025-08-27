import { FastifyInstance } from "fastify";
import { CarController } from "./car.controller.js";

export function createCarRoutes(
  server: FastifyInstance,
  controller: CarController
) {
  server.post("/cars", controller.createCar.bind(controller));
}
export function editCarRoutes(
  server: FastifyInstance,
  controller: CarController
) {
  server.put("/cars", controller.updateCar.bind(controller));
}
export function getCarsRoutes(
  server: FastifyInstance,
  controller: CarController
) {
  server.get("/cars", controller.getAll.bind(controller));
}
export function getCarRoutes(
  server: FastifyInstance,
  controller: CarController
) {
  server.get("/cars/:id", controller.get.bind(controller));
}
export function deleteCarRoutes(
  server: FastifyInstance,
  controller: CarController
) {
  server.delete("/cars/:id", controller.delete.bind(controller));
}
