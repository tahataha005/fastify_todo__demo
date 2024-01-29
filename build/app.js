"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sensible_1 = __importDefault(require("@fastify/sensible"));
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)();
app.register(sensible_1.default);
exports.default = app;
