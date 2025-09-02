import { BadRequestError, ForbiddenError, NotFoundError } from "../../error/errors.js";
import { UserService } from "../user/user.service.js";
import { CarRepository } from "./car.repository.js";
import {
  Car,
  RequestCarEditShema,
  RequestCarShema,
} from "./car.shema.js";
import { createCarShema, editCarShema, requestCarShema } from "./car.shema.js";

export class CarSerive {
  private _carRepository: CarRepository;
  private _userService:UserService;
  constructor() {
    this._carRepository = new CarRepository();
    this._userService=new UserService();
  }

  async getAll() {
    let cars = await this._carRepository.getAll();
    if (!cars) {
      throw new NotFoundError("Resource not found");
    }
    return cars;
  }

  async getById(id: number,userId:number) {
    let car = await this._carRepository.getById(id);
    if (!car) {
      throw new NotFoundError("Resource not found");
    }
    let carDTO =Car.safeParse(car);
    if(!carDTO.success) throw new BadRequestError();
    if(!await this._userService.UserPrivilege(userId,carDTO.data.userId)) throw new ForbiddenError();
    return carDTO;
  }

  async delete(id: number,userId:number) {
    let car =await this.getById(id,userId);
    if(!car) throw new NotFoundError("The resource not found");
    await this._carRepository.delete(id);
  }

  async create(_requestCarShemma: RequestCarShema,_userId:number) {
    const carData = createCarShema.safeParse({
      ..._requestCarShemma,
      userId:_userId,
    });
    if(!carData.success) throw new BadRequestError();
    let id = await this._carRepository.create(carData.data);
    if (!id) {
      throw new BadRequestError("Can not create the user record");
    }
  }

  async edit(carShema:RequestCarEditShema,user_Id:number,paramId:number) {
    let result = editCarShema.safeParse({...carShema,userId:user_Id,id:paramId});
    if (!result.success)
      throw new BadRequestError("Invalid properties");
     let car =await this.getById(paramId,user_Id);
     if(!car) throw new NotFoundError("Can not create the user record");
     await this._carRepository.edit(result.data)
  }
}
