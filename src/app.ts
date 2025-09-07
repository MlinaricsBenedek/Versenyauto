import fastify from "fastify";
import { GlobalErrorHandler } from "./error/GlobalErrorHandlers.js";
import fastifyCookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
 import {jsonSchemaTransform,serializerCompiler,validatorCompiler,ZodTypeProvider} from "fastify-type-provider-zod"
import fastifySwaggerUI from "@fastify/swagger-ui";
import dotenv from "dotenv";
import cors from "@fastify/cors"

import Passport, { Authenticator }  from "@fastify/passport"
import fastifySecureSession from "@fastify/secure-session";
import { accessTokenAutenticator, loginStrategy } from "./routes/middlewear/middlewear.strategy.js";
import { UserService } from "./service/user.service.js";
import { userRoutes } from "./routes/user.route.js";
import { authRoutes } from "./routes/auth.route.js";
import { racetrackRoutes } from "./routes/racetrack.routes.js";
import { carRoutes } from "./routes/car.route.js";
import { BadRequestError } from "./error/errors.js";


dotenv.config();

const server = fastify({
  logger: {
    serializers: {
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
      req(req) {
        return {
          method: req.method,
          url: req.url,
          cookies: req.cookies,
          body: req.body,
          parameters: req.params,
          headers: req.headers,
        };
      },
    },
  },
 }).withTypeProvider<ZodTypeProvider>();

 
server.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET!,
});

server.register(fastifySecureSession, {
  key: Buffer.from('9F3A1C7D4B2E8F1065A1D9C0B4F7E2D1A3C5B6E7F8A9D0C1B2E3F4A5C6D7E8F9', 'hex')
});
const passport = new Authenticator();
 server.register(passport.initialize());
 server.register(passport.secureSession()); 
server.register(cors,{origin:"*"});
dotenv.config();



server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.register(swagger, {
   mode: "dynamic",
  openapi: {
    info: {
      title: "versenyauto API",
      description: "Egyszerű Fastify + Zod + Swagger példa",
      version: "1.0.0",
    },
     components: {
       securitySchemes: {
         RefreshCookie: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken", 
        },
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      
    },
     security: [{ BearerAuth: [] }], 
  },
  transform: jsonSchemaTransform, 
});

server.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

server.addHook("preHandler", function (req, reply, done) {
  if (req.body) {
    req.log.info({ body: req.body }, "parsed body");
  }
  done();
});

accessTokenAutenticator(passport);
const userService =new UserService()
loginStrategy(passport,userService);

server.setErrorHandler(GlobalErrorHandler.ErrorHandler);
async function main() {
  try {

   await server.register(async (instance) => {
  await userRoutes(server, passport);
})
   await server.register(async (instance) => {
  await authRoutes(server, passport); })
   await server.register(async (instance) => {
  await racetrackRoutes(server, passport);})
   await server.register(async (instance) => {
  await carRoutes(server, passport);})
  
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log(`Server is running on http://0.0.0.0:3000`);

  } catch (e) {
    console.error("Connection failed", e);

    process.exit(1);
  }
}

main();
