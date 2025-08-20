import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { CarSerive } from "./car.service.js";
import {
  CreateCarShema,
  RequestCarEditShema,
  RequestCarShema,
} from "./car.shema.js";
import { BadRequestError, NotFoundError } from "../../errors/error.js";

export class CarController {
  private carService: CarSerive;
  constructor() {
    this.carService = new CarSerive();
  }

  async createCar(
    request: FastifyRequest<{ Body: RequestCarShema }>,
    reply: FastifyReply
  ) {
    try {
      await this.carService.create(request.body);
      return reply.code(201).send();
    } catch (error) {
    
      if (error instanceof BadRequestError) {
        return reply.code(400).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }
  async updateCar(
    request: FastifyRequest<{ Body: RequestCarEditShema }>,
    reply: FastifyReply
  ) {
    try {
      await this.carService.edit(request.body);
      return reply.code(201).send();
    } catch (error) {
      if (error instanceof NotFoundError) {
      return reply.code(404).send({ message: error.message });
    } else if (error instanceof BadRequestError) {
      return reply.code(400).send({ message: error.message });
    } else {
      return reply.code(500).send({ message: "Internal server error" });
    }
    }
  }
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      let cars = await this.carService.getAll();
      return reply.code(200).send(cars);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return reply.code(400).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }

  async get(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const carId = Number(request.params.id);
      const car = await this.carService.getById(carId);
      return reply.code(200).send(car);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return reply.code(400).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const carId = Number(request.params.id);
      await this.carService.delete(carId);
      return reply.code(204).send();
    } catch (error) {
      return reply.code(500).send(error);
    }
  }
}
