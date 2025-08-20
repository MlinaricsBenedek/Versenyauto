import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service.js";
import { CreateUserInput, EditUserShema } from "./user.shema.js";
import { BadRequestError, NotFoundError } from "../../errors/error.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async registerUserHandler(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    try {
      await this.userService.registerUser(request.body);
      return reply.code(201).send();
    } catch (error) {
      if (error instanceof BadRequestError) {
        return reply.code(400).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }

  async get(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const userId = Number(request.params.id);
      let user = await this.userService.get(userId);
      return reply.code(200).send(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      let users = await this.userService.getAll();
      return reply.code(200).send(users);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return reply.code(400).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }

  async update(
    request: FastifyRequest<{ Body: EditUserShema }>,
    reply: FastifyReply
  ) {
    try {
      await this.userService.update(request.body);
      return reply.code(201).send();
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return reply.code(400).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      let userId = Number(request.params.id);
      await this.userService.delete(userId);
      return reply.code(204).send();
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return reply.code(400).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }
}
