import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller.js";
import {
  authenticate,
  autorization,
} from "../user/middlewear/middlewear.strategy.js";
import { Role } from "../../helper/enum.js";
import {
  LoginRequest,
} from "./auth.shema.js";
import z from "zod/v4";

export function authRoutes(server: FastifyInstance) {
  const controller = new AuthController();

  server.post<{ Body: LoginRequest }>(
    "/auth",
    {
      schema: {
        body: { $ref: "RequestLoginSchema#" },
        response: { 201: { $ref: "LoginResponseSchema#" } },
      },
    },
    controller.login.bind(controller)
  );

  server.put(
    "/auth",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)]},
    //   schema: {
    //     response: { 204: {} },
    //   },
    // },
    controller.logout.bind(controller)
  );

  server.post(
    "/auth/refresh",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      // schema: {
      //   response: { 201: { $ref: "LoginResponseSchema#" } },
      // },
    },
    controller.refresh.bind(controller)
  );
}
