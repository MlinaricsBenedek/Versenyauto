import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service.js";
import { LoginRequest, requestLoginShema } from "./user.shema.js";
import { BadRequestError } from "../../error/errors.js";

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async loginHandler(
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply
  ) {
    let result = requestLoginShema.safeParse(request.body);
    if (!result.success) throw new BadRequestError();
    return reply.code(201).send(await this.userService.login(request.body));
  }
}
