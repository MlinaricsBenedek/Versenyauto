import { FastifyInstance } from "fastify";
import {zodToJsonSchema} from "zod-to-json-schema";
import z, { number } from "zod/v3";

export const requestTrackShema = z.object({
  name: z.string().min(3,"The name is required"),
  country: z.string().min(3,"country is required"),
  kilometer: z.number().min(14,"kilometer is required"),
});
export const createTrackSHema = z.object({
  name: z.string(),
  country: z.string(),
  kilometer: z.number(),
  userId:z.number()
});
export const editTrackSHema = z.object({
  id:z.number(),
  name: z.string(),
  country: z.string(),
  kilometer: z.number(),
  userId:z.number()
});


export type RequestTrackShema = z.infer<typeof requestTrackShema>;
export type CreateTrackShema = z.infer<typeof createTrackSHema>;
export type EditTrackShema = z.infer<typeof editTrackSHema>;

 export const requestTrackJSONShema = zodToJsonSchema(requestTrackShema);
 export const arrayTrackShema = z.array(editTrackSHema)
 export const arrayTrackJSONShema =zodToJsonSchema(arrayTrackShema)
 export const TrackJSONShema=zodToJsonSchema(editTrackSHema);
 
export function registerTrackSchemas(server: FastifyInstance) {
server.addSchema({
    $id: "RequestTrackSchema",
    ...zodToJsonSchema(requestTrackShema),
  });

  server.addSchema({
    $id: "EditTrackSchema",
    ...zodToJsonSchema(editTrackSHema),
  });

  server.addSchema({
    $id: "ArrayTrackSchema",
    ...zodToJsonSchema(arrayTrackShema),
  });
}