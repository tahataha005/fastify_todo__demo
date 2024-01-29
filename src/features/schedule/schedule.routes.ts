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
import { routeHandler } from "../../config/utils/routes/route";

export const scheduleRoutes: RouteGroup = (app, options, done) => {
  app.get(
    "/:id?",
    routeHandler<{}, IdParamSchema>(getSchedules, { params: IdParam }, [
      authMiddleware,
    ])
  );

  app.post(
    "/",
    routeHandler<CreateScheduleDto, {}>(
      createSchedule,
      { body: createScheduleSchema },
      [authMiddleware]
    )
  );

  app.put(
    "/:id",
    routeHandler<UpdateScheduleDto, IdParamSchema>(
      updateSchedule,
      {
        params: IdParam,
        body: updateScheduleSchema,
      },
      [authMiddleware]
    )
  );

  app.delete(
    "/:id",
    routeHandler<{}, IdParamSchema>(deleteSchedule, { params: IdParam }, [
      authMiddleware,
    ])
  );

  done();
};
