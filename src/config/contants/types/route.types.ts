import { FastifyInstance, FastifyPluginOptions } from "fastify";

export type RouteGroup = (
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: DoneFunction
) => void;

type DoneFunction = (err?: Error) => void;

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";
