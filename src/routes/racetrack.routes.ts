import { RaceTrackController } from "../controller/racetrack.controller.js";
import {
  autorization} from "./middlewear/middlewear.strategy.js";
import {
  requestTrackShema,
  RequestTrackShema,
  trackSHema,
  tracksSHema,
} from "../dto/racetrack.shema.js";
import { Role } from "../dto/enum.js";
import z from "zod/v3";
import { FastifyTypedInstance } from "../types.js";
import { Authenticator } from "@fastify/passport";

export function racetrackRoutes(server: FastifyTypedInstance,fasitfyPassport:Authenticator) {
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
      preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyiranyito)],
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
      preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyiranyito)],    },
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
      preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyiranyito)],    },
    controller.getAll.bind(controller)
  );

  server.get<{ Params: { id: string } }>(
    "/racetrack/:id",
    {
      schema: {security: [{ BearerAuth: [] }],
        tags: ["racetrack"],
        response: { 200: trackSHema },
      },
         preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyiranyito)],
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
      preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyiranyito)],    },
    controller.delete.bind(controller)
  );
}
