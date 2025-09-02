import db from "../../db/db.js";
import { Role } from "../../helper/enum.js";
import type {  CreateUserShema, EditUserShema, UserReponse } from "./user.shema.js";

export class UserRepository {
  async create(userDto: CreateUserShema) {
    return await db("user")
      .insert({
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
        role: userDto.role
      })
      .returning("id");
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

  async deleteRefreshToken(userId:number){
    return await db("user").where({id:userId}).update({refreshToken:null}).returning('id')
  }

  async updateRole(userRole:Role,userId:number){
    return await db("user").where({id:userId}).update({role:userRole})
  }

  async update(userDto: EditUserShema) {
    return await db("user")
      .select("*")
      .where({ id: userDto.id })
      .update({
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
        refreshToken:userDto.refreshToken
      })
      .returning("id");
  }
}
