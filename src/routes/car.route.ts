import { CarController } from "../controller/car.controller.js"
import {
  arrayCarShema,
  carShema,
  CarShema,
  CreateCarShema,
  RequestCarShema,
  requestCarShema,
} from "../dto/car.shema.js";
import {
  autorization,
} from "./middlewear/middlewear.strategy.js";
import { Role } from "../dto/enum.js";
import z from "zod/v3";
import { FastifyTypedInstance } from "../types.js"
import { Authenticator } from "@fastify/passport";

export function carRoutes(server: FastifyTypedInstance,fasitfyPassport:Authenticator) {
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
      preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyzo)],    
    },
    controller.create.bind(controller)
  );

  server.put<{ Body: RequestCarShema; Params: { id: string } }>(
    "/cars/:id",
    {
     
      schema: {
   security: [{ BearerAuth: [] }],
        tags: ["car"],
        body: requestCarShema,
        response: {
          201: z.string(),
        },
      },
           preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyzo)],   
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
           preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyiranyito)],   

    },
    controller.getAll.bind(controller)
  );

  server.get<{ Params: { id: string } }>(
    "/cars/:id",
    {
    
      schema: {
         security: [{ BearerAuth: [] }],
        tags: ["car"],
        response: {
          200: carShema,
        },
      },
        preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyzo)],   
    },
    controller.get.bind(controller)
  );

  server.delete<{ Params: { id: string } }>(
    "/cars/:id",
    {

      schema: {
       security: [{ BearerAuth: [] }],
        tags: ["car"],
        response: {
          204: z.null(),
        },
      },
        preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyzo)],   
    },
    controller.delete.bind(controller)
  );
}
