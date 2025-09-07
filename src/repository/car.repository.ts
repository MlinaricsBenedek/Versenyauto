import db from "../db/db.js";
import { CarShema, CreateCarShema } from "../dto/car.shema.js";


export class CarRepository {
  async create(carDto: CreateCarShema) {
    return await db("car")
      .insert({
        brand: carDto.brand,
        type: carDto.type,
        horsepower: carDto.horsepower,
        user_id: carDto.userId,
      })
      .returning("id");
  }

  async getById(id: number) {
    return db("car").select("*").where({ id }).first();
  }

  async delete(id: number) {
    return await db("car").where({ id }).delete();
  }

  async edit(carDto: CarShema) {
    return await db("car")
      .select("*")
      .where({ id: carDto.id })
      .update({
        brand: carDto.brand,
        type: carDto.type,
        horsepower: carDto.horsepower,
      })
      .returning("id");
  }

  async getAll() {
    return await db("car").select("*");
  }
}
