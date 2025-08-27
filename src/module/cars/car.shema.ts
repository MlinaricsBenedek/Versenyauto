import z from "zod/v3";

export const createCarShema = z.object({
  brand: z.string().min(3, "Brand is required"),
  type: z.string().min(2, "Type is required"),
  horsepower: z.number().min(100, "horsepower is required"),
  userId: z.number(),
});
export const requestCarEditShema = z.object({
  id: z.number(),
  brand: z.string().min(3, "Brand is required"),
  type: z.string().min(2, "Type is required"),
  horsepower: z.number().min(100, "Horsepower is required"),
});
export const editCarShema = z.object({
  id: z.number().min(1, "Id is required"),
  brand: z.string().min(3, "Brand is required"),
  type: z.string().min(2, "Type is required"),
  horsepower: z.number().min(100, "Horsepower is required"),
  userId: z.number(),
});
export const requestCarShema = z.object({
  brand: z.string().min(3, "Brand is required"),
  type: z.string().min(2, "Type is required"),
  horsepower: z.number().min(100, "Horsepower is required"),
});

export type EditCarShema = z.infer<typeof editCarShema>;
export type CreateCarShema = z.infer<typeof createCarShema>;
export type RequestCarShema = z.infer<typeof requestCarShema>;
export type RequestCarEditShema = z.infer<typeof requestCarEditShema>;
