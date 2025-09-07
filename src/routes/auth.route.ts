import { AuthController } from "../controller/auth.controller.js";
import {
  autorization,
} from "../routes/middlewear/middlewear.strategy.js";
import { Role } from "../dto/enum.js";
import {
  LoginRequest,
  loginResponseShema,
  requestLoginShema,
} from "../dto/auth.shema.js";
import z from "zod/v4";
import { FastifyTypedInstance } from "../types.js";
import { Authenticator } from "@fastify/passport";

export function authRoutes(server: FastifyTypedInstance,fasitfyPassport:Authenticator) {
  const controller = new AuthController();

  server.post<{ Body: LoginRequest }>(
    "/auth",
    {
      schema: {
        tags: ["auth"],
        body: requestLoginShema,
        response: { 201: loginResponseShema },
      },
      preHandler: fasitfyPassport.authenticate('local',{ session: false })
    },
    controller.login.bind(controller)
  );

  server.put(
    "/auth",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        tags: ["auth"],
        response: {
          204: z.null(),
        },
      },
      preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyzo)],
    },
    controller.logout.bind(controller)
  );

  server.post(
    "/auth/refresh",
    {
      schema: {
        security: [{ BearerAuth: []}],/* ,RefreshCookie: []*/ 
        tags: ["auth"],
        response: { 201: loginResponseShema },
      },
        preHandler: [fasitfyPassport.authenticate('jwt',{ session: false }), autorization(Role.versenyzo)],
    },
    controller.refresh.bind(controller)
  );
}
