import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { BadRequestError, ForbiddenError, UnathorizedError } from "../../../error/errors.js";
import dotenv from "dotenv"
import { jwTokenResponse } from '../user.shema.js';
import { Role } from '../../../helper/enum.js';
dotenv.config();

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
      try {
        const authHeader = request.headers['authorization'];
        if (!authHeader) throw new UnathorizedError('Missing token');

        const token = authHeader.split(' ')[1];
        if (!token) throw new ForbiddenError('Missing token');

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        let userDto = jwTokenResponse.safeParse(payload);
        if(!userDto.success) throw new UnathorizedError("Invalid token");
        
        (request as any).userId=userDto.data.id;
        (request as any).role=userDto.data.role.toString();
      } catch (err) {
        throw new UnathorizedError("token expired or missing");
      }
    }
    
export function autorization(minimumRole:Role){
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const role = (request as any).role;
    if (!(typeof role==='string')) {
      throw new UnathorizedError("invalid payload data")
    }
    if(role ===Role.versenyzo.toString()){
    if ( role!== minimumRole.toString()) {
      throw new ForbiddenError("You dont have access for this resource");
    }
  }
  };
}
//passportJS
//  import {ExtractJwt, Strategy as JwTStrategy} from "passport-jwt";
//   import { UserService } from "../user.service.js";
//   import passport, { Authenticator } from "@fastify/passport";
//   const fasitfyPassport = new Authenticator();
// fasitfyPassport.use(new JwTStrategy({jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//      secretOrKey:process.env.ACCESS_TOKEN_SECRET!},async (userDto,done) =>{
//      const userService = new UserService();
//  try { 
//      let user = await userService.get(userDto.id);
//        if (user) {
//          return done(null, user);
//        } else {
//          return done(null, false);
//        }
//      } catch (err) {
//        return done(err, false);
//      }
//  }
//  ))