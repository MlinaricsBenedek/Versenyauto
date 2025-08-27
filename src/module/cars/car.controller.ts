import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { CarSerive } from "./car.service.js";
import {
  createCarShema,
  CreateCarShema,
  editCarShema,
  RequestCarEditShema,
  RequestCarShema,
} from "./car.shema.js";
import { BadRequestError, NotFoundError } from "../../error/errors.js";

export class CarController {
  private carService: CarSerive;
  constructor() {
    this.carService = new CarSerive();
  }

  async createCar(
    request: FastifyRequest<{ Body: RequestCarShema }>,
    reply: FastifyReply
  ) {
    let result = createCarShema.safeParse(request.body);
    if (!result.success)
      throw new BadRequestError("Invalid properties", result.error);
    await this.carService.create(request.body);
    return reply.code(201).send();
  }
  async updateCar(
    request: FastifyRequest<{ Body: RequestCarEditShema }>,
    reply: FastifyReply
  ) {
    let result = editCarShema.safeParse(request.body);
    if (!result.success)
      throw new BadRequestError("Invalid properties", result.error);
    await this.carService.edit(request.body);
    return reply.code(201).send();
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    let cars = await this.carService.getAll();
    return reply.code(200).send(cars);
  }

  async get(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const carId = Number(request.params.id);
    const car = await this.carService.getById(carId);
    return reply.code(200).send(car);
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const carId = Number(request.params.id);
    await this.carService.delete(carId);
    return reply.code(204).send();
  }
}
