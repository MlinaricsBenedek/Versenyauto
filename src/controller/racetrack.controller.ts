import { FastifyRequest } from "fastify/types/request.js";
import { RaceTrackService } from "../service/racetrack.service.js";
import { FastifyReply } from "fastify/types/reply.js";
import { RequestTrackShema, requestTrackShema } from "../dto/racetrack.shema.js";
import { BadRequestError, NotFoundError, UnathorizedError } from "../error/errors.js";
import { responseUserShema } from "../dto/user.shema.js"

export class RaceTrackController {
  private raceTrackService: RaceTrackService;
  constructor() {
    this.raceTrackService = new RaceTrackService();
  }

  async create(
    request: FastifyRequest<{ Body: RequestTrackShema }>,
    reply: FastifyReply
  ) {
     let user =responseUserShema.safeParse(request.user);
        if(!user.success) throw new UnathorizedError();
      const result = requestTrackShema.safeParse(request.body);
       if(!result.success) throw new BadRequestError("Invalid properties",result.error);
      await this.raceTrackService.create(result.data,user.data.id);
      return reply.code(201).send('the racetrack was successfully created');
    }
  
  async update(
    request: FastifyRequest<{ Body: RequestTrackShema,Params:{id:string} }>,
    reply: FastifyReply
  ) { 
      let paramId = Number(request.params.id)
      if(!paramId) throw new BadRequestError();
      let result = requestTrackShema.safeParse(request.body);
      if(!result.success) throw new BadRequestError("Invalid properties",result.error);
      await this.raceTrackService.edit(result.data,paramId);
      return reply.code(201).send('the racetrack was successfully edited');
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
      return reply.code(200).send(await this.raceTrackService.getAll());
  }

  async get(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {  let paramId =Number(request.params.id);
    if(!paramId) throw new BadRequestError("Param is invalid");
    return reply.code(200).send(await this.raceTrackService.getById(paramId));
    }


  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    let paramId=Number(request.params.id)
    if(!paramId) throw new BadRequestError("Invalid params")
      await this.raceTrackService.delete(paramId);
      return reply.code(204).send();
  }
}
