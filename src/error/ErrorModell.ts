import z from "zod/v3"
export const errorShema = z.object({
    name:z.string(),
    message:z.string(),
    code:z.number(),
});

export type ErrorShema = z.infer<typeof errorShema>;