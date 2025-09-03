import { RaceTrackController } from "./racetrack.controller.js";
import {
  authenticate,
  autorization,
} from "../user/middlewear/middlewear.strategy.js";
import {
  requestTrackShema,
  RequestTrackShema,
  trackSHema,
  tracksSHema,
} from "./racetrack.shema.js";
import { Role } from "../../helper/enum.js";
import z from "zod/v3";
import { FastifyTypedInstance } from "../../types.js";

export function racetrackRoutes(server: FastifyTypedInstance) {
  const controller = new RaceTrackController();
  server.post<{ Body: RequestTrackShema }>(
    "/racetrack",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        tags: ["racetrack"],
        body: requestTrackShema,
        response: { 201: z.string() },
      },
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
    },
    controller.create.bind(controller)
  );

  server.put<{ Body: RequestTrackShema; Params: { id: string } }>(
    "/racetrack/:id",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        tags: ["racetrack"],
        body: requestTrackShema,
        response: { 201: z.string()},
      },
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
    },
    controller.update.bind(controller)
  );

  server.get(
    "/racetrack",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        tags: ["racetrack"],
        response: { 200: tracksSHema },
      },
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
    },
    controller.getAll.bind(controller)
  );

  server.get<{ Params: { id: string } }>(
    "/racetrack/:id",
    {
      schema: {security: [{ BearerAuth: [] }],
        tags: ["racetrack"],
        response: { 200: trackSHema },
      },
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
    },

    controller.get.bind(controller)
  );

  server.delete<{ Params: { id: string } }>(
    "/racetrack/:id",
    {
      schema: {security: [{ BearerAuth: [] }],
        tags: ["racetrack"],
        response: { 204: z.null() },
      },
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
    },
    controller.delete.bind(controller)
  );
}
