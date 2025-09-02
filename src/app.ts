import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { GlobalErrorHandler } from "./error/GlobalErrorHandlers.js";
import fastifyCookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
 import {jsonSchemaTransform,ZodTypeProvider} from "fastify-type-provider-zod"
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
authRoutes
 
} from "./module/auth/auth.route.js";
import dotenv from "dotenv";
import { editCarJSONShema, registerCarSchemas, requestCarEditShema, requestCarJSONShema, responseAllCarJSONShema, responseCarJSONShema } from "./module/cars/car.shema.js";
import {
  carRoutes
} from "./module/cars/car.route.js";
import { userRoutes } from "./module/user/user.route.js";
import {
  racetrackRoutes,
} from "./module/racetrack/racetrack.routes.js";
import { loginJSONSHema, loginResponseShema, registerAuthSchemas, responseLoginJSONSchema } from "./module/auth/auth.shema.js";
import { editRoleJSONSchema, registerUserSchemas, requestCreateUserJSONSHema, userJsonSchema, usersJSONSchema } from "./module/user/user.shema.js";
import { arrayTrackJSONShema, registerTrackSchemas, requestTrackJSONShema, TrackJSONShema } from "./module/racetrack/racetrack.shema.js";

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

dotenv.config();

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
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      }
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
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
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
    
registerCarSchemas(server);
registerUserSchemas(server);
registerAuthSchemas(server);
registerTrackSchemas(server);

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
