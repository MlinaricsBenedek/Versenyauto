import { UserRepository } from "./user.repository.js";
import {
  UserArraySchema,
  CreateUserInput,
  editUserShema,
  EditUserShema,
  LoginRequest,
  responseUserArraySchema,
  responseUserShema,
} from "./user.shema.js";
import { Hash, Verify } from "../../helper/hash.js";
import { BadRequestError, NotFoundError } from "../../error/errors.js";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async registerUser(userDto: CreateUserInput) {
    userDto.password = Hash(userDto.password);
    let id = await this.userRepository.create(userDto);
    if (!id) throw new BadRequestError();
  }

  async get(id: number) {
    let user = await this.userRepository.get(id);
    if (!user) {
      throw new NotFoundError();
    }
    return responseUserShema.parse(user);
  }

  async getAll() {
    let users = await this.userRepository.getAll();
    let usersDto: UserArraySchema = responseUserArraySchema.parse(users);
    if (usersDto.length === 0) throw new NotFoundError();
    else return usersDto;
  }

  async update(_editUserShema: EditUserShema) {
    let data = editUserShema.parse(_editUserShema);
    let id = await this.userRepository.update(data);
    if (!id) throw new NotFoundError();
  }

  async delete(id: number) {
    let deletedCols = await this.userRepository.delete(id);
    if (deletedCols === 0) throw new NotFoundError("Resource not found");
  }

  async login(requestLoginShema: LoginRequest) {
    const user = await this.userRepository.findByEmail(requestLoginShema.email);

    if (!user) {
      throw new NotFoundError("Resource not found");
    }
    let successLogin = Verify(requestLoginShema.password, user.password);
    if (!successLogin) {
      throw new BadRequestError("Email or password invalid");
    }
    return "token";
  }
}
