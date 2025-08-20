import { ca } from "zod/locales";
import db from "../../db/db.js";
import type { CreateCarShema, EditCarShema } from "./car.shema.js";
import { editCarShema } from "./car.shema.js";

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
    return db("car").select("*").where({ id });
  }

  async delete(id: number) {
    return await db("car").where({ id }).delete();
  }

  async edit(carDto: EditCarShema) {
    let data = editCarShema.parse(carDto);
    return await db("car")
      .select("*")
      .where({ id: data.id })
      .update({
        brand: data.brand,
        type: data.type,
        horsepower: data.horsepower,
      })
      .returning("*");
  }

  async getAll() {
    return db("car").select("*");
  }
}
