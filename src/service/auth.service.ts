
import { BadRequestError, ForbiddenError, NotFoundError, UnathorizedError } from "../error/errors.js";
import {  generateToken, genereateRefreshToken, jwtRefreshTokenVerify } from "./helper/tokenHandler.js";

import dotenv from "dotenv";
import { LoginRequest } from "../dto/auth.shema.js";
import { UserRepository } from "../repository/user.repository.js";
import { jwTokenResponse, User, UserReponse } from "../dto/user.shema.js";
dotenv.config();
export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(userDto:UserReponse) {
    let refreshToken = genereateRefreshToken(userDto);
    if(!refreshToken) throw new BadRequestError();
    let user =await this.userRepository.get(userDto.id);
    user.refreshToken =refreshToken;
    await this.userRepository.update(user);
    let jwtToken= generateToken(user);
   return {jwtToken,refreshToken}
  }

  async logout(userDto:UserReponse){

    let user:User = await this.userRepository.get(userDto.id);
    if(!user){
        throw new NotFoundError("User doesnt exist in the database");
    }
    user.refreshToken=null;

    await this.userRepository.deleteRefreshToken(user.id);
  }
  async refresh(refreshToken:string){
    let payload = jwtRefreshTokenVerify(refreshToken);

    let jwtPayload = jwTokenResponse.safeParse(payload);
    if(!jwtPayload.success)
    {
      throw new BadRequestError();
    }

    if(jwtPayload.data.exp*1000<Date.now())
    {
      throw new ForbiddenError();
    }
    let user =await this.userRepository.get(jwtPayload.data.id);

    if(!user){
      throw new NotFoundError("User doesnt exist in the database");
    }
    if(!(refreshToken===user.refreshToken)){
      throw new ForbiddenError();
    }
    return generateToken(user);
  }
 
}
