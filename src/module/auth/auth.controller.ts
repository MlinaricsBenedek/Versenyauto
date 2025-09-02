import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { BadRequestError, UnathorizedError } from "../../error/errors.js";
import { AuthService } from "./auth.service.js";
import { LoginRequest, LoginResponseShema, requestLoginShema } from "./auth.shema.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService=new AuthService()
  }

  async login(
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply
  ) {

    let result = requestLoginShema.safeParse(request.body);
    if (!result.success) throw new BadRequestError();

    let tokens =await this.authService.login(result.data);
    return reply.setCookie(
      'refreshToken',tokens.refreshToken,{
      httpOnly: true,  
    secure: true,     
    sameSite: "strict",
    path: "/auth/refresh",  
    maxAge: 7 * 24 * 60 * 60
    }).code(200).send({accessToken:tokens.jwtToken});
  }
  
  async logout(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    let jwtAccessToken = request.headers['authorization'];
    if(!jwtAccessToken)
    {
      throw new UnathorizedError();
    }
    await this.authService.logout(jwtAccessToken);
  
    return reply.code(204).send();
  }
  async refresh(request: FastifyRequest,
    reply: FastifyReply)
    {
      let refreshToken = request.cookies.refreshToken;
      if(!refreshToken){
        throw new BadRequestError();
      }
      let token=await this.authService.refresh(refreshToken)
      return reply.code(200).send({accessToken:token})
    }

}
