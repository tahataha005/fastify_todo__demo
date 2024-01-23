import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import {} from "fastify/types/type-provider";

export type ControllerMethod = (
  request: FastifyRequest & { user?: User | null },
  reply: FastifyReply
) => Promise<FastifyReply | void>;
