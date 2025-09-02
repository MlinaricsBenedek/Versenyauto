import { FastifyInstance } from "fastify";
import { CarController } from "./car.controller.js";
import {
  arrayShema,
  Car,
  CreateCarShema,
  editCarJSONShema,
  EditCarShema,
  editCarShema,
  requestCarEditShema,
  RequestCarEditShema,
  requestCarJSONShema,
  requestCarShema,
  responseAllCarJSONShema,
  responseCarJSONShema,
} from "./car.shema.js";
import {
  authenticate,
  autorization,
} from "../user/middlewear/middlewear.strategy.js";
import { authorize } from "passport";
import { Role } from "../../helper/enum.js";
import z from "zod/v3";

export function carRoutes(server: FastifyInstance) {
  const controller = new CarController();
  server.post<{ Body: RequestCarEditShema }>(
    "/cars",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      schema: {
        body: { $ref: "RequestCarShema#" },
        response: {
          201: { type: "string" },
        },
      },
    },
    controller.create.bind(controller)
  );

  server.put<{ Body: RequestCarEditShema; Params: { id: string } }>(
    "/cars/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      // schema: {
      //   body: { $ref: "EditCarShema#" },
      //   response: {
      //     201: { type: "string" },
      //   },
      //},
    },
    controller.update.bind(controller)
  );

  server.get(
    "/cars",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      // schema: {
      //   response: {
      //     200: { $ref: "CarsArrayShema#" },
      //   },
    //  },
    },
    controller.getAll.bind(controller)
  );

  server.get<{ Params: { id: string } }>(
    "/cars/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      // schema: {
      //   response: {
      //     200: { $ref: "CarShema#" },
      //   },
      // },
    },
    controller.get.bind(controller)
  );

  server.delete<{ Params: { id: string } }>(
    "/cars/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      // schema: {
      //   response: {
      //     204: {},
      //   },
      // },
    },
    controller.delete.bind(controller)
  );
}
