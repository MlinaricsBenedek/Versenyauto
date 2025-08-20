export class NotFoundError extends Error {
  statusCode: number;
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class BadRequestError extends Error {
  statusCode: number;
  constructor(message = "The request was invalid") {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
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
