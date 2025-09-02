import { FastifyInstance } from "fastify";
import {zodToJsonSchema} from "zod-to-json-schema";
import z from "zod/v3";

export const createCarShema = z.object({
  brand: z.string().min(3, "Brand is required"),
  type: z.string().min(2, "Type is required"),
  horsepower: z.number().min(100, "horsepower is required"),
  userId:z.number(),
});
export const requestCarEditShema = z.object({
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
export const Car = z.object({
  id: z.number(),
  brand: z.string(),
  type: z.string(),
  horsepower: z.number(),
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
export const arrayShema = z.array(Car);
export type carsArrayShema =z.infer<typeof arrayShema >;
export type CarShema=z.infer<typeof Car>

export const responseAllCarJSONShema =zodToJsonSchema(arrayShema);
export const responseCarJSONShema=zodToJsonSchema(Car);
export const requestCarJSONShema= zodToJsonSchema(requestCarShema);
export const editCarJSONShema=zodToJsonSchema(editCarShema)

export function registerCarSchemas(server: FastifyInstance) {
  server.addSchema({ $id: "RequestCarShema", ...requestCarJSONShema });
  server.addSchema({ $id: "EditCarShema", ...editCarJSONShema });
  server.addSchema({ $id: "CarShema", ...responseCarJSONShema });
  server.addSchema({ $id: "CarsArrayShema", ...responseAllCarJSONShema });
}