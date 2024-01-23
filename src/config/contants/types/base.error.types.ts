import { FastifyReply } from "fastify";

export interface BaseErrorParams {
  message?: string;
  errorCheck?: boolean;
  reply: FastifyReply;
}

export interface NotFoundParams extends BaseErrorParams {
  entity?: string;
}

export interface ForbiddenParams extends BaseErrorParams {
  action?: string;
}
