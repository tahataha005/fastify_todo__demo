"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const route_1 = require("../../config/utils/routes/route");
const login_req_schema_1 = require("../../features/auth/schemas/login.req.schema");
const register_req_1 = require("./schemas/register.req");
const auth_1 = require("../../features/auth");
const authRoutes = (app, options, done) => {
    app.post("/login", (0, route_1.routeHandler)(auth_1.login, { body: login_req_schema_1.loginSchema }));
    app.post("/register", (0, route_1.routeHandler)(auth_1.register, { body: register_req_1.registerSchema }));
    done();
};
exports.authRoutes = authRoutes;
