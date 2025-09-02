import { FastifyInstance } from "fastify";
import { RaceTrackController } from "./racetrack.controller.js";
import {
  authenticate,
  autorization,
} from "../user/middlewear/middlewear.strategy.js";
import {
  arrayTrackJSONShema,
  arrayTrackShema,
  editTrackSHema,
  requestTrackJSONShema,
  requestTrackShema,
  RequestTrackShema,
  TrackJSONShema,
} from "./racetrack.shema.js";
import { Role } from "../../helper/enum.js";
import { responseCarJSONShema } from "../cars/car.shema.js";
import z from "zod/v3";

export function racetrackRoutes(server: FastifyInstance) {
  const controller = new RaceTrackController();
  server.post<{ Body: RequestTrackShema }>(
    "/racetrack",
    {
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
      // schema: {
      //   body: { $ref: "RequestTrackSchema#" },
      //   response: { 201: { type: "string" } },
      // },
    },
    controller.create.bind(controller)
  );

  server.put<{ Body: RequestTrackShema; Params: { id: string } }>(
    "/racetrack/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
      // schema: {
      //   body: { $ref: "RequestTrackSchema#" },
      //   response: { 201: { type: "string" } },
      // },
    },
    controller.update.bind(controller)
  );

  server.get(
    "/racetrack",
    {
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
      // schema: {
      //   response: { 200: { $ref: "ArrayTrackSchema#" } },
      // },
    },
    controller.getAll.bind(controller)
  );

  server.get<{ Params: { id: string } }>(
    "/racetrack/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyiranyito)]},
    //   schema: {
    //     response: { 200: { $ref: "EditTrackSchema#" } },
    //   },
    // },
    controller.get.bind(controller)
  );

  server.delete<{ Params: { id: string } }>(
    "/racetrack/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyiranyito)]},
    //   schema: {
    //     response: { 204: {} },
    //   },
    // },
    controller.delete.bind(controller)
  );
}
