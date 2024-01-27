import { ControllerMethod } from "../../config/contants/types/controller.type";
import { IdParamSchema } from "../../config/contants/types/request.type";
import { throwNotFound } from "../../config/utils/errors/errors";
import Schedule from "./models/schedule.model";
import { CreateScheduleDto } from "./schemas/create.schedule.dto";
import { UpdateScheduleDto } from "./schemas/update.schedule.dto";

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

export const createSchedule: ControllerMethod = async (request, reply) => {
  const { day, todos } = request.body as CreateScheduleDto;
  const { user } = request;

  const schedule = await Schedule.create({
    data: {
      day,
      todos: {
        connect: todos.map((todo) => ({ id: todo })),
      },
      userId: user!.id,
    },
  });

  return reply.send(schedule);
};

export const updateSchedule: ControllerMethod = async (request, reply) => {
  const {day,todos} = request.body as UpdateScheduleDto;
  const { id } = request.params as IdParamSchema;
  const { user } = request;

  const schedule = await Schedule.update({
    where: { id: parseFloat(id) },
    data: {
      day,
      todos: {
        connect: todos.map((todo) => ({ id: todo })),
      },
      userId: user!.id,
    },
  });

  throwNotFound({
    reply,
    entity:"Schedule",
    errorCheck: schedule === null
  })

  return reply.send(schedule);
}