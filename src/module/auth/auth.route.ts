import { AuthController } from "./auth.controller.js";
import {
  authenticate,
  autorization,
} from "../user/middlewear/middlewear.strategy.js";
import { Role } from "../../helper/enum.js";
import {
  LoginRequest,
  loginResponseShema,
  requestLoginShema,
} from "./auth.shema.js";
import z from "zod/v4";
import { FastifyTypedInstance } from "../../types.js";

export function authRoutes(server: FastifyTypedInstance) {
  const controller = new AuthController();

  server.post<{ Body: LoginRequest }>(
    "/auth",
    {
      schema: {
        tags: ["auth"],
        body: requestLoginShema,
        response: { 201: loginResponseShema },
      },
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
      preHandler: [authenticate, autorization(Role.versenyzo)],
    },
    controller.logout.bind(controller)
  );

  server.post(
    "/auth/refresh",
    {
      schema: {
        security: [
          { BearerAuth: [], RefreshCookie: [] }, // mindkettőt egyszerre kell teljesíteni
        ],

        tags: ["auth"],
        response: { 201: loginResponseShema },
      },
      preHandler: [authenticate, autorization(Role.versenyzo)],
    },
    controller.refresh.bind(controller)
  );
}
