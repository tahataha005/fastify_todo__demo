"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sensible_1 = __importDefault(require("@fastify/sensible"));
const fastify_1 = __importDefault(require("fastify"));
const welcome_route_1 = require("./config/contants/variables/welcome.route");
const global_error_handler_1 = require("./config/utils/errors/global.error.handler");
dotenv_1.default.config({
    path: "src/config/settings/enviroments/.env.development",
});
const app = (0, fastify_1.default)();
app.route(Object.assign({}, welcome_route_1.welcomeRoute));
app.register(sensible_1.default);
app.setErrorHandler(global_error_handler_1.errorHandler);
exports.default = app;
