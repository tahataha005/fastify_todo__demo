import { FastifyReply, FastifyRequest } from "fastify";
import { RequestMethod } from "../types/route.types";

export const welcomeRoute: {
  method: RequestMethod;
  url: "/";
  handler: (request: FastifyRequest, reply: FastifyReply) => void;
} = {
  method: "GET",
  url: "/",
  handler: (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send("Hello World");
  },
};
