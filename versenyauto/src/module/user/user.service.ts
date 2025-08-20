import { UserRepository } from "./user.repository.js";
import {
  CreateUserInput,
  editUserShema,
  EditUserShema,
  LoginRequest,
  responseUserArraySchema,
  responseUserShema,
} from "./user.shema.js";
import { Hash, Verify } from "../../helper/hash.js";
import { BadRequestError, NotFoundError } from "../../errors/error.js";


export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async registerUser(userDto: CreateUserInput) {
    try {
      userDto.password = Hash(userDto.password);
      await this.userRepository.create(userDto);
    } catch (error) {
      throw new Error(`Something went wrong${error}`);
    }
  }

  async get(id: number) {
    try {
      let user = await this.userRepository.get(id);
      if (!user) {
        throw new Error();
      }
      return responseUserShema.parse(user);
    } catch (error) {
      throw new Error("" + error);
    }
  }

  async getAll() {
    try {
      let users = await this.userRepository.getAll();
      return responseUserArraySchema.parse(users);
    } catch (error) {
      throw new Error("" + error);
    }
  }

  async update(_editUserShema: EditUserShema) {
    try {
      let data = editUserShema.parse(_editUserShema);
      return await this.userRepository.update(data);
    } catch (error) {
      throw new Error("" + error);
    }
  }

  async delete(id: number) {
    try {
      let number = await this.userRepository.delete(id);
      if (number === 0) {
        throw new NotFoundError("Resource not found");
      }
    } catch (error) {
      throw new Error("Cant find the user");
    }
  }

  async login(requestLoginShema: LoginRequest) {
    try {
      const user = await this.userRepository.findByEmail(
        requestLoginShema.email
      );

      if (!user) {
         throw new NotFoundError("Resource not found");
      }
      let successLogin = Verify(requestLoginShema.password, user.password);
      if (!successLogin) {
        throw new BadRequestError("Email or password invalid")
      }
      return "token";
    } catch (error) {
      throw new Error(`Something went wrong${error}`);
    }
  }
}
