import { FastifyRequest } from "fastify/types/request.js";
import { RaceTrackService } from "./racetrack.service.js";
import { FastifyReply } from "fastify/types/reply.js";
import { CreateRaceTrackShema, EditRaceTrackShema } from "./racetrack.shema.js";
import { BadRequestError, NotFoundError } from "../../errors/error.js";

export class RaceTrackController {
  private raceTrackService: RaceTrackService;
  constructor() {
    this.raceTrackService = new RaceTrackService();
  }

  async create(
    request: FastifyRequest<{ Body: CreateRaceTrackShema }>,
    reply: FastifyReply
  ) {
    try {
      await this.raceTrackService.create(request.body);
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
  async update(
    request: FastifyRequest<{ Body: EditRaceTrackShema }>,
    reply: FastifyReply
  ) {
    try {
      var id = await this.raceTrackService.edit(request.body);
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
      let cars = await this.raceTrackService.getAll();
      return reply.code(200).send(cars);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
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
      const trackId = Number(request.params.id);
      const track = await this.raceTrackService.getById(trackId);
      return reply.code(200).send(track);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
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
      await this.raceTrackService.delete(carId);
      return reply.code(204).send();
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({ message: error.message });
      } else {
        return reply.code(500).send({ message: "Internal server error" });
      }
    }
  }
}
