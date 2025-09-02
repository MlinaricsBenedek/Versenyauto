// user.route.ts
import { FastifyInstance } from "fastify";
import { UserController } from "./user.controller.js";
import {
  authenticate,
  autorization,
} from "./middlewear/middlewear.strategy.js";
import {
  EditUserRequestShema,
  RegisterUserSHema,
} from "./user.shema.js";
import { Role } from "../../helper/enum.js";

export async function userRoutes(server: FastifyInstance) {
  const controller = new UserController();
 server.post<{ Body: RegisterUserSHema }>(
    "/user", {
      //schema: {
      //  body: { $ref: "RequestCreateUserShema#" },
        // response: {
      //     201: { type: "string" },
      //   }
      // }
    },
    controller.register.bind(controller)
  );
  server.get(
    "/user",
    {
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
      // schema: {
      //   response: {
      //     200: { $ref: "UsersArrayShema#" },
      //   },
      //   security: [{ BearerAuth: [] }],
      // },
    },
    controller.getAll.bind(controller)
  );

  server.get<{ Params: { id: string } }>(
    "/user/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      // schema: {
      //   response: {
      //     200: { $ref: "UsersArrayShema#" }, 
      //   },
      // },
    },
    controller.get.bind(controller)
  );

  server.put<{ Body: EditUserRequestShema,Params: { id: string } }>(
    "/user/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      // schema: {
      //   body: { $ref: "RequestCreateUserShema#" },
      //   response: {
      //     201: { type: "string" },
      //   },
      // },
    },
    controller.update.bind(controller)
  );

  server.patch<{ Body: { role: Role }; Params: { id: string } }>(
    "/user/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
      // schema: {
      //   body: { $ref: "EditRoleUserShema#" },
      //   response: {
      //     201: { type: "string" },
      //   },
      // },
    },
    controller.edit.bind(controller)
  );

  server.delete<{ Params: { id: string } }>(
    "/user/:id",
    {
      preHandler: [authenticate, autorization(Role.versenyzo)],
      // schema: {
      //   response: {
      //     204: {}
      //   },
      // },
    },
    controller.delete.bind(controller)
  );
}

