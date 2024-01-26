"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const route_1 = require("./config/utils/routes/route");
const auth_1 = require("./features/auth");
const todo_1 = require("./features/todo");
const welcome_route_1 = require("./config/contants/variables/welcome.route");
dotenv_1.default.config({
    path: ".env",
});
(0, route_1.registerRouteGroup)("/auth", auth_1.authRoutes);
(0, route_1.registerRouteGroup)("/todo", todo_1.todoRoutes);
app_1.default.route(Object.assign({}, welcome_route_1.welcomeRoute));
app_1.default.listen({
    port: parseInt(process.env.SERVER_PORT),
    host: process.env.SERVER_HOST,
}, (err, address) => {
    if (err) {
        console.error(err);
    }
    console.log(`Server listening at ${address}`);
});
