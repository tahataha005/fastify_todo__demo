import { ControllerMethod } from "@config/contants/types/controller.type";
import app from "../../../app";
import { RouteGroup } from "../../contants/types/route.types";
import {
  BodySchema,
  ParamsSchema,
} from "../../../config/contants/types/request.type";
import { bodySchemaBuilder, paramsSchemaBuilder } from "../requests/request";
import { MiddlewareMethod } from "@config/contants/types/middleware.type";

export const registerRouteGroup = (prefix: string, routeGroup: RouteGroup) => {
  app.register(routeGroup, { prefix });
};

export type RouteBuilder = <T, E>(
  handler: ControllerMethod,
  schema: RouteOptions<T, E>,
  preHandlers?: [MiddlewareMethod]
) => {
  handler: ControllerMethod;
  schema: {};
  prehandler?: [MiddlewareMethod];
};

export type RouteOptions<T, E> = {
  body?: BodySchema<T> | null;
  params?: ParamsSchema<E> | null;
};

export const routeHandler: RouteBuilder = <T, E>(
  handler: ControllerMethod,
  { body, params }: RouteOptions<T, E>,
  preHandlers?: [MiddlewareMethod]
) => {
  return {
    handler,
    schema: {
      ...(body ? bodySchemaBuilder<T>(body) : {}),
      ...(params ? paramsSchemaBuilder<E>(params) : {}),
    },
    preHandler: preHandlers,
  };
};
