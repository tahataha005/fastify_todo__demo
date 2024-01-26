import { RouteGroup } from "../../config/contants/types/route.types";
import { IdParam } from "../../config/utils/requests/request";
import { getSchedules } from "./schedule.controller";
import { authMiddleware } from "../../config/settings/middlewares/auth.middleware";

export const scheduleRoutes: RouteGroup = (app, options, done) => {
  app.get("/:id?", {
    schema: IdParam,
    handler: getSchedules,
    preHandler: [authMiddleware],
  });

  done();
};
