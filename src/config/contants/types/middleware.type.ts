import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export type MiddlewareMethod = (
  request: FastifyRequest & { user?: User | null },
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => void;
