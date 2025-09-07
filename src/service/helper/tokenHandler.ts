import { UnathorizedError } from "../../error/errors.js";
import { UserReponse } from "../../dto/user.shema.js"
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();
export function generateToken(user:UserReponse) {
   return jwt.sign({id:user.id,role:user.role},process.env.ACCESS_TOKEN_SECRET!,{expiresIn:'1h'})
}

export function genereateRefreshToken(user:UserReponse) {
    return jwt.sign({id:user.id,role:user.role},process.env.REFRESH_TOKEN_SECRET!,{expiresIn:'7d'})
}

export function jwtRefreshTokenVerify(token:string){
    try {
         return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET!)
    } catch (error) {
        throw new UnathorizedError("Invalid access token"+error);
    }
}
