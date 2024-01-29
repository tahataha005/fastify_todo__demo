import { RouteGroup } from "../../config/contants/types/route.types";
import { createTodo, deleteTodo, updateTodo, getTodo } from "./todo.controller";
import { authMiddleware } from "../../config/settings/middlewares/auth.middleware";
import {
  IdParam,
  bodySchemaBuilder,
  paramsSchemaBuilder,
} from "../../config/utils/requests/request";
import { CreateTodoDto, createTodoSchema } from "./schemas/create.todo.dto";
import { UpdateTodoDto, updateTodoSchema } from "./schemas/update.todo.dto";
import { routeHandler } from "../../config/utils/routes/route";
import { IdParamSchema } from "../../config/contants/types/request.type";

export const todoRoutes: RouteGroup = (app, options, done) => {
  app.get(
    "/:id?",
    routeHandler<{}, IdParamSchema>(getTodo, { params: IdParam }, [
      authMiddleware,
    ])
  );

  app.post(
    "/",
    routeHandler<CreateTodoDto, {}>(createTodo, { body: createTodoSchema }, [
      authMiddleware,
    ])
  );

  app.put(
    "/:id",
    routeHandler<UpdateTodoDto, IdParamSchema>(
      updateTodo,
      {
        params: IdParam,
        body: updateTodoSchema,
      },
      [authMiddleware]
    )
  );

  app.delete(
    "/:id",
    routeHandler<{}, IdParamSchema>(deleteTodo, { params: IdParam }, [
      authMiddleware,
    ])
  );

  done();
};
