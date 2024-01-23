import { RouteGroup } from "@config/contants/types/route.types";
import { createTodo, deleteTodo, updateTodo, getTodo } from "./todo.controller";
import { authMiddleware } from "@config/settings/middlewares/auth.middleware";
import {
  IdParam,
  bodySchemaBuilder,
  paramsSchemaBuilder,
} from "@config/utils/requests/request";
import { CreateTodoDto, createTodoSchema } from "./schemas/create.todo.dto";
import { UpdateTodoDto, updateTodoSchema } from "./schemas/update.todo.dto";

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

  app.put("/:id", {
    schema: {
      ...paramsSchemaBuilder(IdParam.params),
      ...bodySchemaBuilder<UpdateTodoDto>(updateTodoSchema),
    },
    handler: updateTodo,
    preHandler: [authMiddleware],
  });

  app.delete("/:id", {
    schema: IdParam,
    handler: deleteTodo,
    preHandler: [authMiddleware],
  });

  done();
};
