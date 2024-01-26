"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRoutes = void 0;
const request_1 = require("../../config/utils/requests/request");
const schedule_controller_1 = require("./schedule.controller");
const auth_middleware_1 = require("../../config/settings/middlewares/auth.middleware");
const scheduleRoutes = (app, options, done) => {
    app.get("/:id?", {
        schema: request_1.IdParam,
        handler: schedule_controller_1.getSchedules,
        preHandler: [auth_middleware_1.authMiddleware],
    });
    done();
};
exports.scheduleRoutes = scheduleRoutes;
