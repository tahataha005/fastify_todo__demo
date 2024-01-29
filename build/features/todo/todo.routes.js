"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoutes = void 0;
const todo_controller_1 = require("./todo.controller");
const auth_middleware_1 = require("../../config/settings/middlewares/auth.middleware");
const request_1 = require("../../config/utils/requests/request");
const create_todo_dto_1 = require("./schemas/create.todo.dto");
const update_todo_dto_1 = require("./schemas/update.todo.dto");
const route_1 = require("../../config/utils/routes/route");
const todoRoutes = (app, options, done) => {
    app.get("/:id?", (0, route_1.routeHandler)(todo_controller_1.getTodo, { params: request_1.IdParam }, [
        auth_middleware_1.authMiddleware,
    ]));
    app.post("/", (0, route_1.routeHandler)(todo_controller_1.createTodo, { body: create_todo_dto_1.createTodoSchema }, [
        auth_middleware_1.authMiddleware,
    ]));
    app.put("/:id", (0, route_1.routeHandler)(todo_controller_1.updateTodo, {
        params: request_1.IdParam,
        body: update_todo_dto_1.updateTodoSchema,
    }, [auth_middleware_1.authMiddleware]));
    app.delete("/:id", (0, route_1.routeHandler)(todo_controller_1.deleteTodo, { params: request_1.IdParam }, [
        auth_middleware_1.authMiddleware,
    ]));
    done();
};
exports.todoRoutes = todoRoutes;
