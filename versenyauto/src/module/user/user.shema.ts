import z, { number } from "zod";

export const responseUserShema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

export const editUserShema = z.object({
  id: number(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  password: z.string(),
});

const requestLoginShema = z.object({
  email: z.string(),
  password: z.string(),
});

const createUserShema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserShema>;
export type UserReponse = z.infer<typeof responseUserShema>;
export type LoginRequest = z.infer<typeof requestLoginShema>;
export type EditUserShema = z.infer<typeof editUserShema>;
export const responseUserArraySchema = z.array(responseUserShema);
