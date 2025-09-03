
import { Hash, Verify } from "../../helper/hash.js";
import { BadRequestError, ForbiddenError, NotFoundError, UnathorizedError } from "../../error/errors.js";
import {  generateToken, genereateRefreshToken, jwtAccessTokenVerify, jwtRefreshTokenVerify } from "../../helper/tokenHandler.js";
import { UserRepository } from "../user/user.repository.js";
import { jwTokenResponse, responseUserShema, TokenResponse, User, UserReponse, userShema } from "../user/user.shema.js";
import dotenv from "dotenv";
import { LoginRequest } from "./auth.shema.js";
dotenv.config();
export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(requestLoginShema: LoginRequest) {
    const userDto:User = await this.userRepository.findByEmail(requestLoginShema.email);
    if (!userDto) {
      throw new NotFoundError("Resource not found");
    }
    let userModell = userShema.safeParse(userDto)

    if(!userModell.success)
    {
      throw new BadRequestError();
    }
    let successLogin = Verify(requestLoginShema.password, userDto.password);
    if (!successLogin) {
      throw new BadRequestError("Email or password invalid");
    }
    let userPayload= responseUserShema.safeParse(userDto)
    if(!userPayload.success){
      throw new BadRequestError()
    }
    let refreshToken = genereateRefreshToken(userPayload.data);
    if(!refreshToken) throw new BadRequestError();
    userModell.data.refreshToken =refreshToken;
    await this.userRepository.update(userModell.data);
    let jwtToken= generateToken(userModell.data);

   return {jwtToken,refreshToken}
  }

  async logout(jwtToken:string){
    if(!jwtToken) throw new BadRequestError();
    let token = jwtToken.split(' ')[1];
    if(!token)
    {throw new BadRequestError('invalid token')}
    let payload= jwtAccessTokenVerify(token);
     let jwtPayload = jwTokenResponse.safeParse(payload);
     if(!jwtPayload.success){
      throw new BadRequestError();
     }
    let user:User = await this.userRepository.get(jwtPayload.data.id);
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
      throw new ForbiddenError;
    }
    return generateToken(user);
  }
 
}
