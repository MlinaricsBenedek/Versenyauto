import { FastifyInstance } from "fastify";
import {zodToJsonSchema} from "zod-to-json-schema";
import z, { number } from "zod/v3";
import { tr } from "zod/v4/locales";

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
export const trackSHema = z.object({
  id:z.number(),
  name: z.string(),
  country: z.string(),
  kilometer: z.number(),
  owner_id:z.number()
});


export type RequestTrackShema = z.infer<typeof requestTrackShema>;
export type CreateTrackShema = z.infer<typeof createTrackSHema>;
export type TrackShema = z.infer<typeof trackSHema>;
export const tracksSHema=z.array(trackSHema);
export type TracksSHema=z.infer<typeof tracksSHema>