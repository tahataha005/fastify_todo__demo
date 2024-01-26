import { Schedule, Todo, User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

export type ControllerMethod = (
  request: FastifyRequest & {
    user?: (User & { schedules: Schedule[]; todos: Todo[] }) | null;
  },
  reply: FastifyReply
) => Promise<FastifyReply | void>;
