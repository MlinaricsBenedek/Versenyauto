import { CarController } from "./car.controller.js";
import {
  arrayCarShema,
  carShema,
  CarShema,
  CreateCarShema,
  RequestCarShema,
  requestCarShema,
} from "./car.shema.js";
import {
  authenticate,
  autorization,
} from "../user/middlewear/middlewear.strategy.js";
import { Role } from "../../helper/enum.js";
import z from "zod/v3";
import { FastifyTypedInstance } from "../../types.js";

export function carRoutes(server: FastifyTypedInstance) {
  const controller = new CarController();
  server.post<{ Body: RequestCarShema }>(
    "/cars",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        tags: ["car"],
        body: requestCarShema,
        response: {
          201: z.string(),
        },
      },
      preHandler: [authenticate, autorization(Role.versenyzo)],
    },
    controller.create.bind(controller)
  );

  server.put<{ Body: RequestCarShema; Params: { id: string } }>(
    "/cars/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      schema: {
   security: [{ BearerAuth: [] }],
        tags: ["car"],
        body: requestCarShema,
        response: {
          201: z.string(),
        },
      },
    },
    controller.update.bind(controller)
  );

  server.get(
    "/cars",
    {
      schema: {
         security: [{ BearerAuth: [] }],
        tags: ["car"],
        response: {
          200: arrayCarShema,
        },
      },
      preHandler: [authenticate, autorization(Role.versenyzo)],

    },
    controller.getAll.bind(controller)
  );

  server.get<{ Params: { id: string } }>(
    "/cars/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      schema: {
         security: [{ BearerAuth: [] }],
        tags: ["car"],
        response: {
          200: carShema,
        },
      },
    },
    controller.get.bind(controller)
  );

  server.delete<{ Params: { id: string } }>(
    "/cars/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      schema: {
       security: [{ BearerAuth: [] }],
        tags: ["car"],
        response: {
          204: z.null(),
        },
      },
    },
    controller.delete.bind(controller)
  );
}
