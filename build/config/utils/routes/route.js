"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeHandler = exports.registerRouteGroup = void 0;
const app_1 = __importDefault(require("../../../app"));
const request_1 = require("../requests/request");
const registerRouteGroup = (prefix, routeGroup) => {
    app_1.default.register(routeGroup, { prefix });
};
exports.registerRouteGroup = registerRouteGroup;
const routeHandler = (handler, { body, params }, preHandlers) => {
    return {
        handler,
        schema: Object.assign(Object.assign({}, (body ? (0, request_1.bodySchemaBuilder)(body) : {})), (params ? (0, request_1.paramsSchemaBuilder)(params) : {})),
        preHandler: preHandlers,
    };
};
exports.routeHandler = routeHandler;
