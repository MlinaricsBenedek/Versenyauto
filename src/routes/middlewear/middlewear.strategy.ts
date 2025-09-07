import { FastifyRequest, FastifyReply } from "fastify";

import {
  ForbiddenError,
  NotFoundError,
  UnathorizedError,
} from "../../error/errors.js";
import dotenv from "dotenv";
import { responseUserShema } from "../../dto/user.shema.js"
import { Role } from "../../dto/enum.js";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwTStrategy } from "passport-jwt";
import { UserService } from "../../service/user.service.js";
import { Authenticator } from "@fastify/passport";
import { PasswordHandler } from "../../service/helper/hash.js";
dotenv.config();

export const accessTokenAutenticator = (fasitfyPassport: Authenticator) =>
  fasitfyPassport.use(
    new JwTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET!,
      },
      async (userDto, done) => {
        const userService = new UserService();
        try {
          console.log("A middlewear lefutott");
          let user = await userService.getById(userDto.id);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          throw new UnathorizedError("Token is invalid or expired");
        }
      }
    )
  );

export const loginStrategy = (
  fasitfyPassport: Authenticator,
  userService: UserService
) =>
  fasitfyPassport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.findByEmail(email);

          if (!user)
            throw new NotFoundError("Password or email invalid is invalid");
          const passwordHandler = new PasswordHandler();
          const isValid = await passwordHandler.Verify(password, user.password);
          if (!isValid) return done(null, false);

          return done(null, user);
        } catch (err) {
          if (err instanceof NotFoundError)
            throw new NotFoundError("Password or email invalid is invalid");
          throw new UnathorizedError("" + err);
        }
      }
    )
  );
  
export function autorization(minimumRole: Role) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = request.user;
    if (!user) throw new UnathorizedError("Invalid token payload");
    let payload = responseUserShema.safeParse(user);
    if (!payload.success) throw new ForbiddenError("Invalid token payload");
    if (payload.data.role === Role.versenyzo.toString()) {
      if (payload.data.role !== minimumRole.toString()) {
        throw new ForbiddenError("You dont have access for this resource");
      }
    }
  };
}
