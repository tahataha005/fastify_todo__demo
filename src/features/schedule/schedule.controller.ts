import { ControllerMethod } from "../../config/contants/types/controller.type";
import { IdParamSchema } from "../../config/contants/types/request.type";
import {
  throwBadRequest,
  throwNotFound,
} from "../../config/utils/errors/errors";
import Schedule from "./models/schedule.model";
import { checkUniqueDay, checkUniqueTodos } from "./schedule.service";
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
      entity: "Schedule",
      errorCheck: !schedule,
    });

    return reply.send(schedule);
  } else {
    return reply.send(schedules);
  }
};

export const createSchedule: ControllerMethod = async (request, reply) => {
  const { day, todos } = request.body as CreateScheduleDto;
  const { user } = request;

  const parsed = new Date(day);

  const schedules = await Schedule.findMany({
    where: { userId: user!.id },
    include: { todos: true },
  });

  const dayCheck = checkUniqueDay(schedules, parsed);

  throwBadRequest({
    message: "Schedule on provided day already exists",
    errorCheck: dayCheck,
  });

  const todoCheck = checkUniqueTodos(schedules, todos);

  throwBadRequest({
    message: "Some todos are already in another schedule",
    errorCheck: todoCheck,
  });

  const schedule = await Schedule.create({
    include: {
      todos: true,
    },
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
  const { day, todos, toDelete } = request.body as UpdateScheduleDto;
  const { id } = request.params as IdParamSchema;
  const { user } = request;

  if (day) {
    const parsed = new Date(day);

    const schedules = await Schedule.findMany({ where: { userId: user!.id } });

    const dayCheck = checkUniqueDay(schedules, parsed);

    throwBadRequest({
      message: "Schedule on provided day already exists",
      errorCheck: dayCheck,
    });
  }

  if (todos) {
    const schedules = await Schedule.findMany({
      where: { userId: user!.id },
      include: { todos: true },
    });

    const todoCheck = checkUniqueTodos(schedules, todos);

    throwBadRequest({
      message: "Some todos are already in another schedule",
      errorCheck: todoCheck,
    });
  }

  const schedule = await Schedule.update({
    where: { id: parseFloat(id) },
    data: {
      day,
      todos: {
        connect: todos.map((todo) => ({ id: todo })),
        disconnect: toDelete?.map((todo) => ({ id: todo })),
      },
      userId: user!.id,
    },
  });

  throwNotFound({
    errorCheck: schedule === null,
    entity: "Schedule",
  });

  return reply.send(schedule);
};

export const deleteSchedule: ControllerMethod = async (request, reply) => {
  const { id } = request.params as IdParamSchema;
  const { user } = request;

  const schedule = await Schedule.delete({
    where: {
      id: parseInt(id),
      userId: user!.id,
    },
  });

  throwNotFound({
    errorCheck: schedule === null,
    entity: "Schedule",
  });

  return reply.send(schedule);
};
