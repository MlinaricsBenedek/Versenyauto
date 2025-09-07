import { ZodAny, ZodError } from "zod/v3";

export class NotFoundError extends Error {
  statusCode: number;
  constructor(message:string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class BadRequestError extends Error {
  statusCode: number;
  details?:ZodError| undefined;
  constructor(message = "The request was invalid",_details?:ZodError) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    this.message = message;
    this.details=_details;
  }
}

export class ForbiddenError extends Error {
  statusCode: number;
  constructor(message = "You do not have permission") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

export class UnathorizedError extends Error {
  statusCode: number;
  constructor(message = "You are not logged in ") {
    super(message);
    this.name = "UnathorizedError";
    this.statusCode = 401;
  }
}
export class UnprocessableEntity extends Error {
  statusCode: number;
  constructor(message = "Data was modified") {
    super(message);
    this.name = "UnathorizedError";
    this.statusCode = 401;
  }
}
