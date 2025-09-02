import { FastifyRequest } from "fastify/types/request.js";
import { RaceTrackService } from "./racetrack.service.js";
import { FastifyReply } from "fastify/types/reply.js";
import { RequestTrackShema, requestTrackShema } from "./racetrack.shema.js";
import { BadRequestError, NotFoundError, UnathorizedError } from "../../error/errors.js";

export class RaceTrackController {
  private raceTrackService: RaceTrackService;
  constructor() {
    this.raceTrackService = new RaceTrackService();
  }

  async create(
    request: FastifyRequest<{ Body: RequestTrackShema }>,
    reply: FastifyReply
  ) {
    let userId=(request as any).userId;
      const result = requestTrackShema.safeParse(request.body);
       if(!result.success) throw new BadRequestError("Invalid properties",result.error);
      await this.raceTrackService.create(result.data,userId);
      return reply.code(201).send();
    }
  
  async update(
    request: FastifyRequest<{ Body: RequestTrackShema,Params:{id:string} }>,
    reply: FastifyReply
  ) { let userId=(request as any).userId;
      let paramId = Number(request.params.id)
      if(!paramId) throw new BadRequestError();
      let result = requestTrackShema.safeParse(request.body);
      if(!result.success) throw new BadRequestError("Invalid properties",result.error);
      await this.raceTrackService.edit(result.data,userId,paramId);
      return reply.code(201).send();
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    let userId=(request as any).userId;
    if(!userId) throw new UnathorizedError();
     let tracks=await this.raceTrackService.getAll()
      return reply.code(200).send(tracks);
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
