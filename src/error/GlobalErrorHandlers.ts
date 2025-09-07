import { FastifyReply, FastifyRequest } from "fastify";
import {  formatZodError } from "./ErrorModell.js";
import { BadRequestError, ForbiddenError, NotFoundError, UnathorizedError, UnprocessableEntity } from "./errors.js";

import { unknown, ZodError } from "zod/v3";
export class GlobalErrorHandler{
 
    public static ErrorHandler(error:Error|ZodError,request:FastifyRequest,reply:FastifyReply){
    if(error instanceof NotFoundError)
    {
        reply.code(404).send({
            statusCode:404,
            name:"NotFound",
            message:"The resource is not found"+error.message,
        });
        request.log.error({ err: error, url: request.url, method: request.method });
    }
if (error instanceof BadRequestError) {
  reply.code(400).send({
    statusCode: 400,
    name: "BadRequest",
    message: "Validation error"+error.message,
    details: error.details 
      ? formatZodError(error.details) 
      : []
  });
  request.log.error({ err: error, url: request.url, method: request.method });
}
    if(error instanceof ForbiddenError)
    {
          reply.code(403).send({
            statusCode:403,
            name:"Forbidden",
            message:"You don't have the permission"+error.message,
        });
        request.log.error({ err: error, url: request.url, method: request.method });
    }
     if(error instanceof UnathorizedError)
    {
          reply.code(401).send({
            statusCode:401,
            name:"UnathorizedError",
            message:"You are not logged in "+error.message,
        });
        request.log.error({ err: error, url: request.url, method: request.method });
    }
    if(error instanceof UnprocessableEntity)
    {
          reply.code(422).send({
            statusCode:422,
            name:"UnprocessableEntity",
            message:"The data was modified, can not execute the request "+error.message,
        });
        request.log.error({ err: error, url: request.url, method: request.method });
    }
    // else
    // {
    //     reply.code(500).send({
    //         statusCode:500,
    //         name:"Internal Server Error",
    //         message:"Ooopsss.... Something went wrong, please try again later",
    //     });
    // }
}
}


