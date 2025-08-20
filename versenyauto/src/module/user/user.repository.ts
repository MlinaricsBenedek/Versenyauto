import db from "../../db/db.js";
import type { CreateUserInput, EditUserShema } from "./user.shema.js";

export class UserRepository {
  async create(userDto: CreateUserInput) {
    await db("user").insert({
      name: userDto.name,
      email: userDto.email,
      password: userDto.password,
      role: "user",
    });
  }

  async findByEmail(email: string) {
    return db("user").select("*").where({ email }).first();
  }

  async get(id: number) {
    return db("user").select("*").where({ id }).first();
  }

  async getAll() {
    return db("user").select("*");
  }

  async delete(id: number) {
    return await db("user").where({ id }).delete();
  }

  async update(userDto: EditUserShema) {
    return await db("user")
      .select("*")
      .where({ id: userDto.id })
      .update({
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
        role: "user",
      })
      .returning("id");
  }
}
