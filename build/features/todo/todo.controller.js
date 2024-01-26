"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = void 0;
const errors_1 = require("../../config/utils/errors/errors");
const todo_1 = __importDefault(require("../../features/todo"));
const todo_service_1 = require("./todo.service");
const getTodo = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { user } = request;
    if (id) {
        const todo = yield todo_1.default.findUnique({ where: { id: parseFloat(id) } });
        (0, errors_1.throwNotFound)({
            errorCheck: !todo,
            entity: "Todo",
            reply,
        });
        return reply.send(todo);
    }
    else {
        const todos = yield todo_1.default.findMany({ where: { userId: user.id } });
        return reply.send(todos);
    }
});
exports.getTodo = getTodo;
const createTodo = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = request;
    const { title, description, time, score } = request.body;
    const todo = yield todo_1.default.create({
        data: {
            title,
            description,
            time,
            score,
            completed: false,
            userId: user.id,
        },
    });
    return reply.send(todo);
});
exports.createTodo = createTodo;
const updateTodo = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { user } = request;
    const { title, description, time, score, completed } = request.body;
    const old = yield todo_1.default.findUnique({
        where: {
            id: parseFloat(id),
            userId: user.id,
        },
    });
    (0, errors_1.throwNotFound)({
        errorCheck: !old,
        entity: "Todo",
        reply,
    });
    const todo = yield todo_1.default.update({
        where: {
            id: parseFloat(id),
            userId: user.id,
        },
        data: {
            title,
            description,
            time,
            score,
            completed,
        },
    });
    if (old.score !== score || old.completed !== completed) {
        yield (0, todo_service_1.calculateScoreIfUpdated)(user);
    }
    return reply.send(todo);
});
exports.updateTodo = updateTodo;
const deleteTodo = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { user } = request;
    const todo = yield todo_1.default.delete({
        where: {
            id: parseFloat(id),
            userId: user.id,
        },
    });
    (0, errors_1.throwNotFound)({
        entity: "Todo",
        reply,
    });
    return reply.send(todo);
});
exports.deleteTodo = deleteTodo;
