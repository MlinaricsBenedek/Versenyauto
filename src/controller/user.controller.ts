import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../service/user.service.js";
import {
  EditUserRequestShema,
  requestUserShema,
  RequestUserSHema,
  responseUserShema,
  UserReponse,
} from "../dto/user.shema.js"
import { BadRequestError, NotFoundError, UnathorizedError } from "../error/errors.js";
import { Role } from "../dto/enum.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async register(
    request: FastifyRequest<{ Body: RequestUserSHema }>,
    reply: FastifyReply
  ) {
    console.log("beléptünk a végpontra")
    const result = requestUserShema.safeParse(request.body);
    if (!result.success)
      throw new BadRequestError("Invalid properties", result.error);
    await this.userService.register(result.data);
    return reply.code(201).send("successfull registration");
  }

  async get(request: FastifyRequest<{Params: { id: string }}>, reply: FastifyReply) {
      let userDto = responseUserShema.safeParse(request.user)
      let paramId=Number(request.params.id)
      if(!userDto.success) throw new UnathorizedError();
    if(!paramId) throw new BadRequestError("Invalid params")
  return reply.code(200).send(await this.userService.get(paramId,userDto.data.id));
}

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(await this.userService.getAll());
  }

  async edit(request: FastifyRequest<{ Body: {role:Role},Params: { id: string } }>,
    reply: FastifyReply){
      let userId=Number(request.params.id)
    if(!userId) throw new BadRequestError("Invalid params")
      if(!request.body.role && (Role.versenyiranyito !==request.body.role || Role.versenyzo !==request.body.role))
      {
        throw new BadRequestError('Role has to be versenyzo or versenyiranyito');
      }
      await this.userService.editUserRole(userId,request.body.role);
      return reply.code(201).send("User role have been updated");
  }

  async update(
    request: FastifyRequest<{ Body:RequestUserSHema ,Params: { id: string } }>,
    reply: FastifyReply
  ) {
     let user =responseUserShema.safeParse(request.user);
    if(!user.success) throw new UnathorizedError();
    let paramId=Number(request.params.id)
    if(!paramId) throw new BadRequestError("Invalid params")
    const result = requestUserShema.safeParse({...request.body});
    if (!result.success)
      throw new BadRequestError("Invalid properties", result.error);
    await this.userService.update(result.data,user.data.id,paramId);
    return reply.code(201).send("Your accoutn have been updated");
  } 

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    let user =responseUserShema.safeParse(request.user);
    if(!user.success) throw new UnathorizedError();
    let paramId=Number(request.params.id)
    if(!paramId) throw new BadRequestError("Invalid params")
    await this.userService.delete(paramId,user.data.id);
    return reply.code(204).send();
  }
}
