import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorShema } from "./ErrorModell.js";
import { BadRequestError, ForbiddenError, NotFoundError, UnathorizedError } from "./errors.js";
import { formatZodError } from "../module/user/user.shema.js";
import { ZodError } from "zod/v3";
export class GlobalErrorHandler{
 
    public static ErrorHandler(error:Error|ZodError,request:FastifyRequest,reply:FastifyReply){
    if(error instanceof NotFoundError)
    {
        reply.code(404).send({
            statusCode:404,
            name:"NotFound",
            message:"The resource is not found",
        });
    }
if (error instanceof BadRequestError) {
  reply.code(400).send({
    statusCode: 400,
    name: "BadRequest",
    message: "Validation error",
    details: error.details 
      ? formatZodError(error.details) 
      : []
  });
}
    if(error instanceof ForbiddenError)
    {
          reply.code(403).send({
            statusCode:403,
            name:"Forbidden",
            message:"You don't have the permission",
        });
    }
     if(error instanceof UnathorizedError)
    {
          reply.code(401).send({
            statusCode:401,
            name:"UnathorizedError",
            message:"You are not logged in ",
        });
    }
    else
    {
        reply.code(500).send({
            statusCode:500,
            name:"Internal Server Error",
            message:"Ooopsss.... Something went wrong, please try again later",
        });
    }
}
}


