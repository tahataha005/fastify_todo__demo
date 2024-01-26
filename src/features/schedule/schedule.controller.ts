import { ControllerMethod } from "../../config/contants/types/controller.type";
import { IdParamSchema } from "../../config/contants/types/request.type";
import { throwNotFound } from "../../config/utils/errors/errors";

export const getSchedules: ControllerMethod = async (request, reply) => {
  const { id } = request.params as IdParamSchema;
  const { user } = request;

  const schedules = user!.schedules;

  if (id) {
    const schedule = schedules.find(
      (schedule) => schedule.id === parseFloat(id)
    );

    throwNotFound({
      errorCheck: !schedule,
      entity: "Schedule",
      reply,
    });

    return reply.send(schedule);
  } else {
    return reply.send(schedules);
  }
};
