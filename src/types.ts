import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import pino from "pino"

export type FastifyTypedInstance=FastifyInstance<
RawServerDefault,
RawRequestDefaultExpression,
 RawReplyDefaultExpression,
FastifyBaseLogger,
 ZodTypeProvider
 >