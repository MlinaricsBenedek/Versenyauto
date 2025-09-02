import { FastifyInstance } from "fastify";
import {zodToJsonSchema} from "zod-to-json-schema";
import z from "zod/v3";

export const requestLoginShema = z.object({
  email: z.string(),
  password: z.string(),
});
export const loginResponseShema=z.object({
  accessToken:z.string()
})
export type LoginRequest = z.infer<typeof requestLoginShema>;
export const loginJSONSHema = zodToJsonSchema(requestLoginShema);
export type LoginResponseShema=z.infer<typeof loginResponseShema>
export const responseLoginJSONSchema = zodToJsonSchema(loginResponseShema);

export function registerAuthSchemas(server: FastifyInstance) {
 server.addSchema({
    $id: "RequestLoginSchema",
    ...zodToJsonSchema(requestLoginShema),
  });

  server.addSchema({
    $id: "LoginResponseSchema",
    ...zodToJsonSchema(loginResponseShema),
  });
}