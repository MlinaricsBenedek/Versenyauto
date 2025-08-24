import z from "zod/v3";

export const createRaceTrackShema = z.object({
  name: z.string().min(3,"The name is required"),
  country: z.string().min(3,"country is required"),
  kilometer: z.number().min(14,"kilometer is required"),
});
export const editRaceTrackShema = z.object({
  id: z.number().min(1,"Id is required"),
  name: z.string().min(3,"The name is required"),
  country: z.string().min(3,"country is required"),
  kilometer: z.number().min(14,"kilometer is required"),
});

export type CreateRaceTrackShema = z.infer<typeof createRaceTrackShema>;
export type EditRaceTrackShema = z.infer<typeof editRaceTrackShema>;
