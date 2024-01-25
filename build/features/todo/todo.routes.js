"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoutes = void 0;
const todo_controller_1 = require("./todo.controller");
const auth_middleware_1 = require("../../config/settings/middlewares/auth.middleware");
const request_1 = require("../../config/utils/requests/request");
const create_todo_dto_1 = require("./schemas/create.todo.dto");
const update_todo_dto_1 = require("./schemas/update.todo.dto");
const todoRoutes = (app, options, done) => {
    app.get("/:id", {
        schema: request_1.IdParam,
        handler: todo_controller_1.getTodo,
        preHandler: [auth_middleware_1.authMiddleware],
    });
    app.post("/", {
        schema: (0, request_1.bodySchemaBuilder)(create_todo_dto_1.createTodoSchema),
        handler: todo_controller_1.createTodo,
        preHandler: [auth_middleware_1.authMiddleware],
    });
    app.put("/:id", {
        schema: Object.assign(Object.assign({}, (0, request_1.paramsSchemaBuilder)(request_1.IdParam.params)), (0, request_1.bodySchemaBuilder)(update_todo_dto_1.updateTodoSchema)),
        handler: todo_controller_1.updateTodo,
        preHandler: [auth_middleware_1.authMiddleware],
    });
    app.delete("/:id", {
        schema: request_1.IdParam,
        handler: todo_controller_1.deleteTodo,
        preHandler: [auth_middleware_1.authMiddleware],
    });
    done();
};
exports.todoRoutes = todoRoutes;
