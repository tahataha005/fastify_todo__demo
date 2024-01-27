"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScheduleSchema = void 0;
exports.updateScheduleSchema = {
    properties: {
        day: { type: "string" },
        todos: { type: "array", items: { type: "number" } },
    },
    required: [],
};
