"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
exports.loginSchema = {
    properties: {
        email: { type: "string", format: "email" },
        sentPassword: { type: "string" },
    },
    required: ["email", "sentPassword"],
};
