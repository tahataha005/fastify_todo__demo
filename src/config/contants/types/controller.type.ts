import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

export type ControllerMethod = (
  request: FastifyRequest & { user?: User | null },
  reply: FastifyReply
) => Promise<FastifyReply | void>;
