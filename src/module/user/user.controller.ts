import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service.js";
import {
  editUserRequestShema,
  EditUserRequestShema,
  editUserShema,
  registerUserShema,
  RegisterUserSHema,
  userJsonSchema,
  UserReponse,
} from "./user.shema.js";
import { BadRequestError, NotFoundError, UnathorizedError } from "../../error/errors.js";
import { Role } from "../../helper/enum.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async register(
    request: FastifyRequest<{ Body: RegisterUserSHema }>,
    reply: FastifyReply
  ) {
    const result = registerUserShema.safeParse(request.body);
    if (!result.success)
      throw new BadRequestError("Invalid properties", result.error);
    await this.userService.register(result.data);
    return reply.code(201).send();
  }

  async get(request: FastifyRequest<{Params: { id: string }}>, reply: FastifyReply) {
 let userId=(request as any).userId;
      let paramId=Number(request.params.id)
    if(!paramId) throw new BadRequestError("Invalid params")
      let user = await this.userService.get(paramId,userId)
  return reply.code(200).send(user);
}

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(await this.userService.getAll());
  }

  async edit(request: FastifyRequest<{ Body: {role:Role},Params: { id: string } }>,
    reply: FastifyReply){
      let userId=Number(request.params.id)
    if(!userId) throw new BadRequestError("Invalid params")
      if(!request.body.role)
      {
        throw new BadRequestError('Role is required');
      }
      await this.userService.editUserRole(userId,request.body.role);
      return reply.code(200).send();
  }

  async update(
    request: FastifyRequest<{ Body: EditUserRequestShema,Params: { id: string } }>,
    reply: FastifyReply
  ) {
    let userId=(request as any).userId;
    let paramId=Number(request.params.id)
    if(!paramId && !userId) throw new BadRequestError("Invalid params")
    const result = editUserRequestShema.safeParse({...request.body});
    if (!result.success)
      throw new BadRequestError("Invalid properties", result.error);
    await this.userService.update(result.data,userId,paramId);
    return reply.code(201).send();
  } 

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    let userId=(request as any).userId;
    let paramId=Number(request.params.id)
    if(!paramId) throw new BadRequestError("Invalid params")
    await this.userService.delete(paramId,userId);
    return reply.code(204).send();
  }
}
