import { number,  z, ZodError } from "zod/v3";
import { BadRequestError } from "../../error/errors.js";
import { Role } from "../../helper/enum.js";
import {zodToJsonSchema} from "zod-to-json-schema";
import { FastifyInstance } from "fastify";

export const responseUserShema = z.object({
  id:z.number(),
  name: z.string(),
  email: z.string(),
  role: z.nativeEnum(Role)
});
export const registerUserShema = z.object({
  name: z.string(),
  email: z.string(),
  password:z.string(),
});
export const createUserShema = z.object({
  name: z.string(),
  email: z.string(),
  password:z.string(),
  role: z.nativeEnum(Role)
});
export const editUserRequestShema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(4, "Email is required"),
  password: z
    .string()
    .min(6, "The password has to be 6 character or more...")
    .regex(/[A-Z]/, "The password must contain at least one uppercase letter")
    .regex(/[a-z]/, "The password must contain at least one lowercase letter")
    .regex(/[0-9]/, "The password must contain at least one number"),
});
export const editUserShema = z.object({
  id:z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  refreshToken:z.string().nullable()
});

export const User = z.object({
  id: number(),
  name: z.string(),
  email: z.string(),
  role: z.nativeEnum(Role),
  password: z.string(),
  refreshToken:z.string().nullable()
})


export const jwTokenResponse=z.object({
 role: z.nativeEnum(Role),
  id:z.number(),
  exp:z.number(),
  iat:z.number().nullable()
})

export const userRequestShema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(4, "Email is required"),
  password: z
    .string()
    .min(6, "The password has to be 6 character or more...")
    .regex(/[A-Z]/, "The password must contain at least one uppercase letter")
    .regex(/[a-z]/, "The password must contain at least one lowercase letter")
    .regex(/[0-9]/, "The password must contain at least one number"),
});
export const editRoleUserShema = z.object({
   role: z.nativeEnum(Role)
});
export function formatZodError(zodError: ZodError<unknown>) {
  return zodError.errors.map((e) => ({
    field: e.path.join("."),
    detail: e.message ?? "Invalid properties",
  }));
}

export type CreateUserShema = z.infer<typeof createUserShema>;
export type RegisterUserSHema = z.infer<typeof registerUserShema>
export type UserReponse = z.infer<typeof responseUserShema>;
export type EditUserShema = z.infer<typeof editUserShema>;
export type EditUserRequestShema = z.infer<typeof editUserRequestShema>;
export const responseUserArraySchema = z.array(responseUserShema);
export type UserArraySchema = z.infer<typeof responseUserArraySchema>;
export type TokenResponse = z.infer<typeof jwTokenResponse>
export type User = z.infer<typeof User>

export const requestCreateUserJSONSHema=zodToJsonSchema(userRequestShema);
export const usersJSONSchema = zodToJsonSchema(responseUserArraySchema);
export const userJsonSchema = zodToJsonSchema(responseUserShema);
export const editUserRequestJSONSHema= zodToJsonSchema(editUserRequestShema);
export const editRoleJSONSchema = zodToJsonSchema(editRoleUserShema)

export function registerUserSchemas(server: FastifyInstance) {
 server.addSchema({ $id: "UsersArrayShema", ...usersJSONSchema });
  server.addSchema({ $id: "RequestCreateUserShema", ...requestCreateUserJSONSHema });
  server.addSchema({ $id: "EditRoleUserShema", ...editRoleJSONSchema });
}