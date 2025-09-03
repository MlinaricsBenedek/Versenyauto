import  { FastifyReply, FastifyRequest } from "fastify";
import { CarSerive } from "./car.service.js";
import {

  requestCarShema,
  RequestCarShema,
} from "./car.shema.js";
import { BadRequestError, UnathorizedError } from "../../error/errors.js";


export class CarController {
  private carService: CarSerive;
  constructor() {
    this.carService = new CarSerive();
  }

  async create(
    request: FastifyRequest<{ Body: RequestCarShema }>,
    reply: FastifyReply
  ) {
    let userId=(request as any).userId;
    if(!userId) throw new UnathorizedError();
    let result = requestCarShema.safeParse(request.body);
     if (!result.success) throw new BadRequestError("Invalid properties",result.error);

    await this.carService.create(result.data,userId);
    return reply.code(201).send();
  }

  async update(
    request: FastifyRequest<{ Body: RequestCarShema,Params:{id:string} }>,
    reply: FastifyReply
  ) {
    let userId=(request as any).userId;
    let paramId = Number(request.params.id)
     if(!paramId){
      throw new BadRequestError("Param is invalidS");
     }
     let editShema=requestCarShema.safeParse(request.body)
    if(!editShema.success) throw new BadRequestError();
    await this.carService.edit(editShema.data,userId,paramId);
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
    let userId=(request as any).userId; 
    const carId = Number(request.params.id);
    const car = await this.carService.getById(carId,userId);
    return reply.code(200).send(car);
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
     let id=(request as any).userId;
     
    const carId = Number(request.params.id);
    const userId = Number(request.params.id)
    await this.carService.delete(carId,userId);
    return reply.code(204).send();
  }
}
