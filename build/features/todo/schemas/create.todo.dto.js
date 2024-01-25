"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoSchema = void 0;
exports.createTodoSchema = {
    properties: {
        title: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 1 },
        time: { type: "string" },
        score: { type: "number" },
    },
    required: ["title", "time"],
};
