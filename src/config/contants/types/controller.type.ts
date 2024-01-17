import { FastifyReply, FastifyRequest } from "fastify";
import {
  FastifyReplyType,
  FastifyRequestType,
} from "fastify/types/type-provider";

export type ControllerMethod = (
  request: FastifyRequest,
  reply: FastifyReply
) => Promise<FastifyReply | void>;
