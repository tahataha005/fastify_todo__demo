"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRoutes = void 0;
const request_1 = require("../../config/utils/requests/request");
const schedule_controller_1 = require("./schedule.controller");
const auth_middleware_1 = require("../../config/settings/middlewares/auth.middleware");
const create_schedule_dto_1 = require("./schemas/create.schedule.dto");
const update_schedule_dto_1 = require("./schemas/update.schedule.dto");
const route_1 = require("../../config/utils/routes/route");
const scheduleRoutes = (app, options, done) => {
    app.get("/:id?", (0, route_1.routeHandler)(schedule_controller_1.getSchedules, { params: request_1.IdParam }, [
        auth_middleware_1.authMiddleware,
    ]));
    app.post("/", (0, route_1.routeHandler)(schedule_controller_1.createSchedule, { body: create_schedule_dto_1.createScheduleSchema }, [auth_middleware_1.authMiddleware]));
    app.put("/:id", (0, route_1.routeHandler)(schedule_controller_1.updateSchedule, {
        params: request_1.IdParam,
        body: update_schedule_dto_1.updateScheduleSchema,
    }, [auth_middleware_1.authMiddleware]));
    app.delete("/:id", (0, route_1.routeHandler)(schedule_controller_1.deleteSchedule, { params: request_1.IdParam }, [
        auth_middleware_1.authMiddleware,
    ]));
    done();
};
exports.scheduleRoutes = scheduleRoutes;
