"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
exports.registerSchema = {
    properties: {
        email: { type: "string", format: "email" },
        password: {
            type: "string",
            minLength: 8,
            maxLength: 32,
            pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
        },
        firstName: { type: "string", minLength: 2 },
        lastName: { type: "string", minLength: 2 },
    },
    required: ["email", "password", "firstName", "lastName"],
};
