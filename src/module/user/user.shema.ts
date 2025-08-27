import { number, z, ZodError } from "zod/v3";
import { BadRequestError } from "../../error/errors.js";

export const responseUserShema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(4, "Email is required"),
  role: z.string().min(2, "The role is required"),
});

export const editUserShema = z.object({
  id: number().min(1, "Id is required"),
  name: z.string().min(4, "Name is required"),
  email: z.string().min(4, "Email is required"),
  role: z.string().min(2, "The role is required"),
  password: z
    .string()
    .min(6, "The password has to be 6 character or more...")
    .regex(/[A-Z]/, "The password must contain at least one uppercase letter")
    .regex(/[a-z]/, "The password must contain at least one lowercase letter")
    .regex(/[0-9]/, "The password must contain at least one number"),
});

export const requestLoginShema = z.object({
  email: z.string(),
  password: z.string(),
});

export const createUserShema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(4, "Email is required"),
  password: z
    .string()
    .min(6, "The password has to be 6 character or more...")
    .regex(/[A-Z]/, "The password must contain at least one uppercase letter")
    .regex(/[a-z]/, "The password must contain at least one lowercase letter")
    .regex(/[0-9]/, "The password must contain at least one number"),
});

export function formatZodError(zodError: ZodError<unknown>) {
  return zodError.errors.map((e) => ({
    field: e.path.join("."),
    detail: e.message ?? "Invalid properties",
  }));
}

export type CreateUserInput = z.infer<typeof createUserShema>;
export type UserReponse = z.infer<typeof responseUserShema>;
export type LoginRequest = z.infer<typeof requestLoginShema>;
export type EditUserShema = z.infer<typeof editUserShema>;
export const responseUserArraySchema = z.array(responseUserShema);
export type UserArraySchema = z.infer<typeof responseUserArraySchema>;
