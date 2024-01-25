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
exports.calculateScoreIfUpdated = void 0;
const auth_1 = __importDefault(require("../../features/auth"));
const todo_model_1 = __importDefault(require("./models/todo.model"));
const calculateScoreIfUpdated = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_model_1.default.findMany({
        where: {
            userId: user.id,
        },
    });
    const score = todos.reduce((acc, todo) => {
        if (todo.completed) {
            return acc + todo.score;
        }
        return acc;
    }, 0);
    yield auth_1.default.update({
        where: {
            id: user.id,
        },
        data: {
            score: score,
        },
    });
});
exports.calculateScoreIfUpdated = calculateScoreIfUpdated;
