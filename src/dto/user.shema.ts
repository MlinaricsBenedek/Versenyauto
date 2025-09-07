import { number,  z, ZodError } from "zod/v3";
import { BadRequestError } from "../error/errors.js"
import { Role } from "../dto/enum.js"
import {zodToJsonSchema} from "zod-to-json-schema";
import { FastifyInstance } from "fastify";

export const requestUserShema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(4, "Email is required"),
  password: z
    .string()
    .min(6, "The password has to be 6 character or more...")
    .regex(/[A-Z]/, "The password must contain at least one uppercase letter")
    .regex(/[a-z]/, "The password must contain at least one lowercase letter")
    .regex(/[0-9]/, "The password must contain at least one number"),
});
export const responseUserShema = z.object({
  id:z.number(),
  name: z.string(),
  email: z.string(),
  role: z.nativeEnum(Role)
});

export const userShema = z.object({
  id: number(),
  name: z.string(),
  email: z.string(),
  role: z.nativeEnum(Role),
  password: z.string(),
  refreshToken:z.string().nullable()
})
export const createUserShema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.nativeEnum(Role),
  password: z.string(),
})
export const jwTokenResponse=z.object({
 role: z.nativeEnum(Role),
  id:z.number(),
  exp:z.number(),
  iat:z.number().nullable()
})
export const editRoleUserShema = z.object({
   role: z.nativeEnum(Role)
});



export type RequestUserSHema = z.infer<typeof requestUserShema>
export type UserReponse = z.infer<typeof responseUserShema>;
export type EditUserRequestShema = z.infer<typeof requestUserShema>;
export const responseUserArraySchema = z.array(responseUserShema);
export type UserArraySchema = z.infer<typeof responseUserArraySchema>;
export type TokenResponse = z.infer<typeof jwTokenResponse>
export type User = z.infer<typeof userShema>
export type CreateUserShema = z.infer<typeof createUserShema>