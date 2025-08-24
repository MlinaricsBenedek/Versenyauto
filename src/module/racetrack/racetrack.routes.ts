import { FastifyInstance } from "fastify";
import { RaceTrackController } from "./racetrack.controller.js";

export function createRaceTrackRoutes(
  server: FastifyInstance,
  controller: RaceTrackController
) {
  server.post("/racetrack", controller.create.bind(controller));
}
export function editRaceTrackRoutes(
  server: FastifyInstance,
  controller: RaceTrackController
) {
  server.put("/racetrack", controller.update.bind(controller));
}
export function getRaceTrackesRoutes(
  server: FastifyInstance,
  controller: RaceTrackController
) {
  server.get("/racetrack", controller.getAll.bind(controller));
}
export function getRaceTrackRoutes(
  server: FastifyInstance,
  controller: RaceTrackController
) {
  server.get("/racetrack/:id", controller.get.bind(controller));
}
export function deletRaceTrackeRoutes(
  server: FastifyInstance,
  controller: RaceTrackController
) {
  server.delete("/racetrack/:id", controller.delete.bind(controller));
}
