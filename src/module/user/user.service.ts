import { UserRepository } from "./user.repository.js";
import {
  createUserShema,
  EditUserRequestShema,
  editUserShema,
  EditUserShema,
  RegisterUserSHema,
  responseUserArraySchema,
  responseUserShema,
  User,
} from "./user.shema.js";
import { Hash, Verify } from "../../helper/hash.js";
import { BadRequestError, ForbiddenError, NotFoundError, UnathorizedError } from "../../error/errors.js";
import { throwDeprecation } from "process";
import { Role } from "../../helper/enum.js";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async register(userDto: RegisterUserSHema) {
    userDto.password = Hash(userDto.password);
    let user = createUserShema.safeParse({...userDto,role:Role.versenyzo})
    if(!user.success) throw new BadRequestError();
    let id = await this.userRepository.create(user.data);
    if (!id) throw new BadRequestError();
  }

  async getUserIfHeHasPrivilige(id: number,userId:number) {
   if(!await this.UserPrivilege(id,userId)){
    throw new ForbiddenError();
   }
    let userDto = await this.userRepository.get(id);
   if (!userDto) {
      throw new NotFoundError("This user doesnt exist in the database");
    }
      var user = User.safeParse(userDto);
      if(!user.success) throw new BadRequestError()
    return user.data;
  }
  async get(id: number,userId:number) {
    let user =await this.getUserIfHeHasPrivilige(id,userId);
    let userDto = responseUserShema.safeParse(user); 
    if(!userDto.success) throw new BadRequestError();
    return userDto.data;
  }
  async getAll() {
    let users = await this.userRepository.getAll();
    let usersDto = responseUserArraySchema.safeParse(users);
    if (!usersDto.success) throw new BadRequestError();
    return usersDto.data;
  }
  async deleteRefreshToken(id:number){
    await this.userRepository.deleteRefreshToken(id);
  }

  async editUserRole(id:number,role:Role){
    let user =await this.userRepository.get(id);
    if(user.role=== Role.versenyiranyito){
      throw new ForbiddenError("you dont have access to do change a Competition manager roles.")
    }
    user.role=role;
    await this.userRepository.updateRole(role,id);
  }

  async update(userShema: EditUserRequestShema,userId:number,paramId:number) {
    let userDto= await this.getUserIfHeHasPrivilige(paramId,userId);
    userShema.password=Hash(userShema.password)
    let user = editUserShema.safeParse({...userShema,refreshToken:userDto.refreshToken,id:paramId})
    if(!user.success) throw new BadRequestError("Invalid request body");
    let id = await this.userRepository.update(user.data);
    if (!id) throw new BadRequestError();
  }

  async delete(id: number,userId:number) {
     if(!await this.UserPrivilege(id,userId)){
    throw new ForbiddenError();
   }
    let deletedCols = await this.userRepository.delete(id);
    if (deletedCols === 0) throw new NotFoundError("Resource not found");
  }

  async UserPrivilege(id:number, userId:number){
    if(id !==userId) {
      let userAdmin:User = await this.userRepository.get(userId);
      if(!userAdmin) throw new BadRequestError();
      if(userAdmin.role !==Role.versenyiranyito){
        return false;
      }
      return true;
    }
    return true;
  }
}
