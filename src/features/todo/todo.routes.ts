import { RouteGroup } from "@config/contants/types/route.types";
import { getTodo } from "./todo.controller";
import { authMiddleware } from "@config/settings/middlewares/auth.middleware";

export const todoRoutes: RouteGroup = (app, options, done) => {
  app.get("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
    },
    handler: getTodo,
    preHandler: [authMiddleware],
  });

  done();
};
