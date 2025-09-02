import { BadRequestError, ForbiddenError, NotFoundError, UnathorizedError } from "../error/errors.js";
import { jwTokenResponse, responseUserShema, TokenResponse, User, UserReponse } from "../module/user/user.shema.js";
import jwt from "jsonwebtoken";
import { FastifyInstance } from 'fastify';
import dotenv from "dotenv";

dotenv.config();
export function generateToken(user:UserReponse) {
   return jwt.sign({id:user.id,role:user.role},process.env.ACCESS_TOKEN_SECRET!,{expiresIn:'1h'})
}

export function genereateRefreshToken(user:UserReponse) {
    return jwt.sign({id:user.id,role:user.role},process.env.REFRESH_TOKEN_SECRET!,{expiresIn:'7d'})
}

export function jwtAccessTokenVerify(token:string){
    try {
         return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!)
    } catch (error) {
        throw new UnathorizedError("Invalid access token"+error);
    }
}
export function jwtRefreshTokenVerify(token:string){
    try {
         return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET!)
    } catch (error) {
        throw new UnathorizedError("Invalid access token"+error);
    }
}
