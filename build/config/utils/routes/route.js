"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouteGroup = void 0;
const app_1 = __importDefault(require("../../../app"));
const registerRouteGroup = (prefix, routeGroup) => {
    app_1.default.register(routeGroup, { prefix });
};
exports.registerRouteGroup = registerRouteGroup;
