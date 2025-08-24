import { NotFoundError } from "../../error/errors.js";
import { CarRepository } from "./car.repository.js";
import {
  CreateCarShema,
  EditCarShema,
  RequestCarEditShema,
  RequestCarShema,
} from "./car.shema.js";
import { createCarShema, editCarShema, requestCarShema } from "./car.shema.js";

export class CarSerive {
  private _carRepository: CarRepository;
  constructor() {
    this._carRepository = new CarRepository();
  }

  async getAll() {
    let cars = await this._carRepository.getAll();
    if (!cars) {
      throw new NotFoundError("Resource not found");
    }
    return cars;
  }

  async getById(id: number) {
    let car = await this._carRepository.getById(id);
    if (!car) {
      throw new NotFoundError("Resource not found");
    }
    return car;
  }

  async delete(id: number) {
    let deletedRecords = await this._carRepository.delete(id);
    if (deletedRecords === 0) {
      throw new NotFoundError("Resource not found");
    }
  }

  async create(_requestCarShemma: RequestCarShema) {
    const carData: CreateCarShema = createCarShema.parse({
      ..._requestCarShemma,
      userId: 1,
    });
    let id = await this._carRepository.create(carData);
    if (!id) {
      throw new NotFoundError();
    }
  }

  async edit(requestCarEditShema: RequestCarEditShema) {
    const carData: EditCarShema = editCarShema.parse({
      ...requestCarEditShema,
      userId: 1,
    });
    let id = await this._carRepository.edit(carData);
    if (!id) {
      throw new NotFoundError();
    }
  }
}
