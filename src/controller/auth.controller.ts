import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { BadRequestError, UnathorizedError } from "../error/errors.js";
import { AuthService } from "../service/auth.service.js";
import { LoginRequest, LoginResponseShema, requestLoginShema } from "../dto/auth.shema.js";
import { responseUserShema, userShema } from "../dto/user.shema.js";


export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService=new AuthService()
  }

  async login(
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply
  ) {
    let user = responseUserShema.safeParse(request.user);

    if(!user.success) throw new UnathorizedError();
    let tokens =await this.authService.login(user.data);
    return reply.setCookie(
      'refreshToken',tokens.refreshToken,{
      httpOnly: true,  
    secure: true,     
    sameSite: "strict",
    path: "/auth/refresh",  
    maxAge: 7 * 24 * 60 * 60
    }).code(201).send({accessToken:tokens.jwtToken});
  }
  
  async logout(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    let user =responseUserShema.safeParse(request.user);
    if(!user.success) throw new UnathorizedError();
    await this.authService.logout(user.data);
  
    return reply.code(204).send();
  }
  async refresh(request: FastifyRequest,
    reply: FastifyReply)
    {
      let refreshToken = request.cookies.refreshToken;
      console.log("request refresh token"+refreshToken)
      if(!refreshToken){
        throw new BadRequestError();
      }
      let token =await this.authService.refresh(refreshToken)
      console.log("refreshtoken"+token)
      return reply.code(201).send({accessToken:token})
    }

}
