import  { FastifyReply, FastifyRequest } from "fastify";
import { CarSerive } from "../service/car.service.js";
import {
  requestCarShema,
  RequestCarShema,
} from "../dto/car.shema.js";
import { BadRequestError, UnathorizedError } from "../error/errors.js";
import { responseUserShema } from "../dto/user.shema.js"


export class CarController {
  private carService: CarSerive;
  constructor() {
    this.carService = new CarSerive();
  }

  async create(
    request: FastifyRequest<{ Body: RequestCarShema }>,
    reply: FastifyReply
  ) {
    let user =responseUserShema.safeParse(request.user);
    if(!user.success) throw new UnathorizedError();
    let result = requestCarShema.safeParse(request.body);
    if (!result.success) throw new BadRequestError("Invalid properties",result.error);

    await this.carService.create(result.data,user.data.id);
    return reply.code(201).send('The car was successfull created');
  }

  async update(
    request: FastifyRequest<{ Body: RequestCarShema,Params:{id:string} }>,
    reply: FastifyReply
  ) {
    let user =responseUserShema.safeParse(request.user);
    if(!user.success) throw new UnathorizedError();
    let paramId = Number(request.params.id)
     if(!paramId){
      throw new BadRequestError("Param is invalidS");
     }
     let editShema=requestCarShema.safeParse(request.body)
    if(!editShema.success) throw new BadRequestError();
    await this.carService.edit(editShema.data,user.data.id,paramId);
    return reply.code(201).send('The car was successfull edited');
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(await this.carService.getAll());
  }

  async get(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    let user =responseUserShema.safeParse(request.user);
    if(!user.success) throw new UnathorizedError();
    const carId = Number(request.params.id);
    return reply.code(200).send(await this.carService.getById(carId,user.data.id));
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    let user =responseUserShema.safeParse(request.user);
    if(!user.success) throw new UnathorizedError();
    const carId = Number(request.params.id)
    await this.carService.delete(carId,user.data.id);
    return reply.code(204).send();
  }
}
