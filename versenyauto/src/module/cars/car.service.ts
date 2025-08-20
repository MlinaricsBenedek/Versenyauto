import { NotFoundError } from "../../errors/error.js";
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
    try {
      let cars = await this._carRepository.getAll();0
      if(!cars)
      {
        throw new NotFoundError("Resource not found");
      }
    } catch (error) {
      return new Error("Can't access to data" + error);
    }
  }

  async getById(id: number) {
    try {
     let car = this._carRepository.getById(id);
     if(!car)
      {
        throw new NotFoundError("Resource not found");
      }
    } catch (error) {
      return new Error("Can't access to data");
    }
  }

  async delete(id: number) {
    try {
      let deletedRecords = await this._carRepository.delete(id);
      if (deletedRecords === 0) {
          throw new NotFoundError("Resource not found");
      }
    } catch (error) {
      return new Error("Cant access to the database");
    }
  }

  async create(_requestCarShemma: RequestCarShema) {
    try {
      const carData: CreateCarShema = createCarShema.parse({
        ..._requestCarShemma,
        userId: 1,
      });
      await this._carRepository.create(carData);
    } catch (error) {
      throw new Error("creatnél bukunk el " + error);
    }
  }

  async edit(requestCarEditShema: RequestCarEditShema) {
    try {
      const carData: EditCarShema = editCarShema.parse({
        ...requestCarEditShema,
        userId: 1,
      });
      await this._carRepository.edit(carData);
    } catch (error) {
      throw new Error("itt bukott el" + error);
    }
  }
}
