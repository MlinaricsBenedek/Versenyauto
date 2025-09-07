import { BadRequestError, ForbiddenError, NotFoundError, UnprocessableEntity } from "../error/errors.js";
import { UserService } from "./user.service.js";
import { arrayCarShema, carShema, CarShema, createCarShema, RequestCarShema } from "../dto/car.shema.js";
import { CarRepository } from "../repository/car.repository.js";


export class CarSerive {
  private _carRepository: CarRepository;
  private _userService:UserService;
  constructor() {
    this._carRepository = new CarRepository();
    this._userService=new UserService();
  }

  async getAll() {
    let carsDTO = await this._carRepository.getAll();
    if (!carsDTO) {
      throw new NotFoundError("Resource not found");
    }
    let cars= arrayCarShema.safeParse(carsDTO)
    if(!cars.success) throw new UnprocessableEntity();
    return cars.data;
  }

  async getById(id: number,autenticatedUserId:number) {
    let car = await this._carRepository.getById(id);
    if (!car) {
      throw new NotFoundError("Resource not found");
    }
    let carDTO =carShema.safeParse(car);
    if(!carDTO.success) throw new UnprocessableEntity();
    if(!await this._userService.UserPrivilege(carDTO.data.user_id,autenticatedUserId)) throw new ForbiddenError();
    return carDTO.data;
  }

  async delete(id: number,autenticatedUserId:number) {
      
    let car =await this.getById(id,autenticatedUserId);
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

  async edit(request:RequestCarShema,autenticatedUserId:number,paramId:number) {
    const car:CarShema =await this.getById(paramId,autenticatedUserId);
     if(!car) throw new NotFoundError("Can not create the user record");
    const editedCar:CarShema = {id:car.id,user_id:car.user_id,...request};
     await this._carRepository.edit(editedCar)
  }
}
