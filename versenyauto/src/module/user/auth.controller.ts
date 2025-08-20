import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service.js";
import { LoginRequest } from "./user.shema.js";

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async loginHandler(
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply
  ) {
    let token = await this.userService.login(request.body);
    if (!token) {
      return reply.code(401).send("password or email isinvalid");
    }
    return reply.code(201).send(token);
  }
}
