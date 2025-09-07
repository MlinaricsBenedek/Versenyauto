import { FastifyInstance } from "fastify";
import {zodToJsonSchema} from "zod-to-json-schema";
import z from "zod/v3";

export const createCarShema = z.object({
  brand: z.string().min(3, "Brand is required"),
  type: z.string().min(2, "Type is required"),
  horsepower: z.number().min(100, "horsepower is required"),
  userId:z.number(),
});

export const carShema = z.object({
  id: z.number().min(1, "Id is required"),
  brand: z.string().min(3, "Brand is required"),
  type: z.string().min(2, "Type is required"),
  horsepower: z.number().min(100, "Horsepower is required"),
  user_id: z.number(),
});
export const requestCarShema = z.object({
  brand: z.string().min(3, "Brand is required"),
  type: z.string().min(2, "Type is required"),
  horsepower: z.number().min(100, "Horsepower is required"),
});

export type CreateCarShema = z.infer<typeof createCarShema>;
export type RequestCarShema = z.infer<typeof requestCarShema>;
export const arrayCarShema = z.array(carShema);
export type carsArrayShema =z.infer<typeof arrayCarShema >;
export type CarShema=z.infer<typeof carShema>

