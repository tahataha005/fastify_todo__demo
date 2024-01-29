"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoSchema = void 0;
exports.updateTodoSchema = {
    properties: {
        title: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 1 },
        time: { type: "string" },
        completed: { type: "boolean" },
        score: { type: "number" },
        scheduleId: { type: "number" },
    },
    required: [],
};
