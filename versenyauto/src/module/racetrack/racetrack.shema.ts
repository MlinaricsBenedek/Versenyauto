import z from "zod";

export const createRaceTrackShema = z.object({
  name: z.string(),
  country: z.string(),
  kilometer: z.number(),
});
export const editRaceTrackShema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  kilometer: z.number(),
});

export type CreateRaceTrackShema = z.infer<typeof createRaceTrackShema>;
export type EditRaceTrackShema = z.infer<typeof editRaceTrackShema>;
