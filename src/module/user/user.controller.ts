import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service.js";
import {
  CreateUserInput,
  createUserShema,
  editUserShema,
  EditUserShema,
} from "./user.shema.js";
import { BadRequestError, NotFoundError } from "../../error/errors.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async registerUserHandler(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    const result = createUserShema.safeParse(request.body);
    if (!result.success)
      throw new BadRequestError("Invalid properties", result.error);
    await this.userService.registerUser(request.body);
    return reply.code(201).send();
  }

  async get(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    return reply
      .code(200)
      .send(await this.userService.get(Number(request.params.id)));
  }
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(await this.userService.getAll());
  }

  async update(
    request: FastifyRequest<{ Body: EditUserShema }>,
    reply: FastifyReply
  ) {
    const result = createUserShema.safeParse(request.body);
    if (!result.success)
      throw new BadRequestError("Invalid properties", result.error);
    await this.userService.update(request.body);
    return reply.code(201).send();
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    await this.userService.delete(Number(request.params.id));
    return reply.code(204).send();
  }
}
