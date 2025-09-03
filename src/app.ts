import fastify from "fastify";
import { GlobalErrorHandler } from "./error/GlobalErrorHandlers.js";
import fastifyCookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
 import {jsonSchemaTransform,serializerCompiler,validatorCompiler,ZodTypeProvider} from "fastify-type-provider-zod"
import fastifySwaggerUI from "@fastify/swagger-ui";
import dotenv from "dotenv";
import { userRoutes } from "./module/user/user.route.js";
import cors from "@fastify/cors"
import { authRoutes } from "./module/auth/auth.route.js";
import { carRoutes } from "./module/cars/car.route.js";
import { racetrackRoutes } from "./module/racetrack/racetrack.routes.js";
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

server.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET!,
});

server.addHook("preHandler", function (req, reply, done) {
  if (req.body) {
    req.log.info({ body: req.body }, "parsed body");
  }
  done();
});
server.setErrorHandler(GlobalErrorHandler.ErrorHandler);

async function main() {
  try {
    server.register(carRoutes)
    server.register(userRoutes)
   server.register(authRoutes)
    server.register(racetrackRoutes)
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log(`Server is running on http://0.0.0.0:3000`);

  } catch (e) {
    console.error("Connection failed", e);

    process.exit(1);
  }
}

main();
