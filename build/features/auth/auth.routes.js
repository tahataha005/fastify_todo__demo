"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const request_1 = require("../../config/utils/requests/request");
const login_req_schema_1 = require("../../features/auth/schemas/login.req.schema");
const auth_1 = require("../../features/auth");
const register_req_1 = require("./schemas/register.req");
const authRoutes = (app, options, done) => {
    app.post("/login", {
        handler: auth_1.login,
        schema: (0, request_1.bodySchemaBuilder)(login_req_schema_1.loginSchema),
    });
    app.post("/register", {
        handler: auth_1.register,
        schema: (0, request_1.bodySchemaBuilder)(register_req_1.registerSchema),
    });
    done();
};
exports.authRoutes = authRoutes;
