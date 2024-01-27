import { RouteGroup } from "../../config/contants/types/route.types";
import {
  IdParam,
  bodySchemaBuilder,
} from "../../config/utils/requests/request";
import { createSchedule, getSchedules } from "./schedule.controller";
import { authMiddleware } from "../../config/settings/middlewares/auth.middleware";
import {
  CreateScheduleDto,
  createScheduleSchema,
} from "./schemas/create.schedule.dto";

export const scheduleRoutes: RouteGroup = (app, options, done) => {
  app.get("/:id?", {
    schema: IdParam,
    handler: getSchedules,
    preHandler: [authMiddleware],
  });

  app.post("/", {
    schema: bodySchemaBuilder<CreateScheduleDto>(createScheduleSchema),
    handler: createSchedule,
    preHandler: [authMiddleware],
  });

  done();
};
