import { UserController } from "./user.controller.js";
import {
  authenticate,
  autorization,
} from "./middlewear/middlewear.strategy.js";
import {
  editRoleUserShema,
  EditUserRequestShema,
  requestUserShema,
  RequestUserSHema,
  responseUserArraySchema,
  responseUserShema,
} from "./user.shema.js";
import { Role } from "../../helper/enum.js";
import { FastifyTypedInstance } from "../../types.js";
import z from "zod";

export async function userRoutes(server: FastifyTypedInstance) {
  const controller = new UserController();
  server.post<{ Body: RequestUserSHema }>(
    "/user",
    {
      schema: {
        tags: ["users"],
        body: requestUserShema,
        response: {
          201: z.string(),
        },
      },
    },
    controller.register.bind(controller)
  );
  server.get(
    "/user",
    {
      schema: {
        tags: ["users"],
        response: {
          200: responseUserArraySchema,
        },
        security: [{ BearerAuth: [] }],
      },
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
    },
    controller.getAll.bind(controller)
  );

  server.get<{ Params: { id: string } }>(
    "/user/:id",
    {
      schema: {
        tags: ["users"],
        response: {
          200: responseUserShema,
        },
      },
      preHandler: [authenticate, autorization(Role.versenyzo)],
    },
    controller.get.bind(controller)
  );

  server.put<{ Body: EditUserRequestShema; Params: { id: string } }>(
    "/user/:id",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        body: requestUserShema,
        tags: ["users"],
        response: {
          201: z.string(),
        },
      },
      preHandler: [authenticate, autorization(Role.versenyzo)],
    },
    controller.update.bind(controller)
  );

  server.patch<{ Body: { role: Role }; Params: { id: string } }>(
    "/user/:id",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        tags: ["users"],
        body: editRoleUserShema,
        response: {
          201: z.string(),
        },
      },
      preHandler: [authenticate, autorization(Role.versenyiranyito)],
    },
    controller.edit.bind(controller)
  );

  server.delete<{ Params: { id: string } }>(
    "/user/:id",
    {
      schema: {
        security: [{ BearerAuth: [] }],
        tags: ["users"],
        response: {
          204: z.null(),
        },
      },
      preHandler: [authenticate, autorization(Role.versenyzo)],
    },
    controller.delete.bind(controller)
  );
}
