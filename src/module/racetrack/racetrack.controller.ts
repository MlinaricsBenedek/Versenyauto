import { FastifyRequest } from "fastify/types/request.js";
import { RaceTrackService } from "./racetrack.service.js";
import { FastifyReply } from "fastify/types/reply.js";
import { createRaceTrackShema, CreateRaceTrackShema, editRaceTrackShema, EditRaceTrackShema } from "./racetrack.shema.js";
import { BadRequestError, NotFoundError } from "../../error/errors.js";
import { editCarShema } from "../cars/car.shema.js";

export class RaceTrackController {
  private raceTrackService: RaceTrackService;
  constructor() {
    this.raceTrackService = new RaceTrackService();
  }

  async create(
    request: FastifyRequest<{ Body: CreateRaceTrackShema }>,
    reply: FastifyReply
  ) {
      const result = createRaceTrackShema.safeParse(request.body);
       if(!result.success) throw new BadRequestError("Invalid properties",result.error);
      await this.raceTrackService.create(request.body);
      return reply.code(201).send();
    }
  
  async update(
    request: FastifyRequest<{ Body: EditRaceTrackShema }>,
    reply: FastifyReply
  ) { 
      let result = editRaceTrackShema.safeParse(request.body);
      if(!result.success) throw new BadRequestError("Invalid properties",result.error);
      await this.raceTrackService.edit(request.body);
      return reply.code(201).send();
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
      return reply.code(200).send( await this.raceTrackService.getAll());
  }

  async get(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {      return reply.code(200).send(await this.raceTrackService.getById(Number(request.params.id)));
    }


  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
      await this.raceTrackService.delete(Number(request.params.id));
      return reply.code(204).send();
  }
}
