import { RouteGroup } from "@config/contants/types/route.types";
import { createTodo, getTodo } from "./todo.controller";
import { authMiddleware } from "@config/settings/middlewares/auth.middleware";
import {
  IdParam,
  bodySchemaBuilder,
  paramsSchemaBuilder,
} from "@config/utils/requests/request";
import { CreateTodoDto, createTodoSchema } from "./schemas/create.todo.dto";

export const todoRoutes: RouteGroup = (app, options, done) => {
  app.get("/:id", {
    schema: IdParam,
    handler: getTodo,
    preHandler: [authMiddleware],
  });

  app.post("/", {
    schema: bodySchemaBuilder<CreateTodoDto>(createTodoSchema),
    handler: createTodo,
    preHandler: [authMiddleware],
  });

  done();
};
