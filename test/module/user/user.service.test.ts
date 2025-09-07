import { Authenticator } from "@fastify/passport";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { UserService } from "../../../src/service/user.service.js";
import { Role } from "../../../src/dto/enum.js";
import { responseUserShema, UserReponse } from "../../../src/dto/user.shema.js";
import { loginStrategy } from "../../../src/routes/middlewear/middlewear.strategy.js";
import { PasswordHandler } from "../../../src/service/helper/hash.js";


describe("loginStrategy ", () => {
  let fastifyPassport: Authenticator;
  let userService: UserService;

  beforeEach(() => {
    fastifyPassport = new Authenticator();
    userService = {
      findByEmail: vi.fn(),
    } as unknown as UserService;
  });
  it("local-strategy should return a request.user()", async () => {
    const mockUser = {
      id: 1,
      name: "TesztUSer",
      email: "teszt@example.com",
      password: "hashedPassword",
      role: Role.versenyzo,
    };
    (userService.findByEmail as any).mockResolvedValue(mockUser);
    vi.spyOn(PasswordHandler.prototype, "Verify").mockResolvedValue(true);
    loginStrategy(fastifyPassport, userService);
    const strategy = fastifyPassport.strategy("local")!;
    let doneUser: UserReponse | null = null;
    const done = (err: any, user?: any) => {
      doneUser = user;
    };
    await strategy._verify("teszt@example.com", "password", done);
    const parsed = responseUserShema.parse(doneUser);
    expect(parsed).toEqual({
      id: 1,
      name: "TesztUSer",
      email: "teszt@example.com",
      role: Role.versenyzo,
    });
  });
});
