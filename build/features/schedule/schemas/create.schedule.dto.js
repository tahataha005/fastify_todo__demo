"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScheduleSchema = void 0;
exports.createScheduleSchema = {
    properties: {
        day: { type: "string" },
        todos: { type: "array", items: { type: "number" } },
    },
    required: ["day", "todos"],
};
