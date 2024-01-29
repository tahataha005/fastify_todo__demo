import { RouteGroup } from "../../config/contants/types/route.types";
import {
  IdParam,
  bodySchemaBuilder,
  paramsSchemaBuilder,
} from "../../config/utils/requests/request";
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
  updateSchedule,
} from "./schedule.controller";
import { authMiddleware } from "../../config/settings/middlewares/auth.middleware";
import {
  CreateScheduleDto,
  createScheduleSchema,
} from "./schemas/create.schedule.dto";
import { IdParamSchema } from "@config/contants/types/request.type";
import {
  UpdateScheduleDto,
  updateScheduleSchema,
} from "./schemas/update.schedule.dto";

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

  app.put("/:id", {
    schema: {
      ...paramsSchemaBuilder<IdParamSchema>(IdParam.params),
      ...bodySchemaBuilder<UpdateScheduleDto>(updateScheduleSchema),
    },
    handler: updateSchedule,
    preHandler: [authMiddleware],
  });

  app.delete("/:id", {
    schema: IdParam,
    handler: deleteSchedule,
    preHandler: [authMiddleware],
  });

  done();
};
