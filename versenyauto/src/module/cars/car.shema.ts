import z from "zod";

export const createCarShema = z.object({
  brand: z.string(),
  type: z.string(),
  horsepower: z.number(),
  userId: z.number(),
});
export const requestCarEditShema = z.object({
  id: z.number(),
  brand: z.string(),
  type: z.string(),
  horsepower: z.number(),
});
export const editCarShema = z.object({
  id: z.number(),
  brand: z.string(),
  type: z.string(),
  horsepower: z.number(),
  userId: z.number(),
});
export const requestCarShema = z.object({
  brand: z.string(),
  type: z.string(),
  horsepower: z.number(),
});

export type EditCarShema = z.infer<typeof editCarShema>;
export type CreateCarShema = z.infer<typeof createCarShema>;
export type RequestCarShema = z.infer<typeof requestCarShema>;
export type RequestCarEditShema = z.infer<typeof requestCarEditShema>;
