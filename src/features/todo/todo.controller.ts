import { ControllerMethod } from "../../config/contants/types/controller.type";
import { IdParamSchema } from "../../config/contants/types/request.type";
import { throwNotFound } from "../../config/utils/errors/errors";
import Todo from "../../features/todo";
import { CreateTodoDto } from "./schemas/create.todo.dto";
import { UpdateTodoDto } from "./schemas/update.todo.dto";
import { calculateScoreIfUpdated } from "./todo.service";

export const getTodo: ControllerMethod = async (request, reply) => {
  const { id } = request.params as IdParamSchema;
  const { user } = request;

  if (id) {
    const todo = await Todo.findUnique({ where: { id: parseFloat(id) } });

    throwNotFound({
      errorCheck: !todo,
      entity: "Todo",
      reply,
    });

    return reply.send(todo);
  } else {
    const todos = await Todo.findMany({ where: { userId: user!.id } });

    return reply.send(todos);
  }
};

export const createTodo: ControllerMethod = async (request, reply) => {
  const { user } = request;
  const { title, description, time, score } = request.body as CreateTodoDto;

  const todo = await Todo.create({
    data: {
      title,
      description,
      time,
      score,
      completed: false,
      userId: user!.id,
    },
  });

  return reply.send(todo);
};

export const updateTodo: ControllerMethod = async (request, reply) => {
  const { id } = request.params as IdParamSchema;
  const { user } = request;
  const { title, description, time, score, completed } =
    request.body as UpdateTodoDto;

  const old = await Todo.findUnique({
    where: {
      id: parseFloat(id),
      userId: user!.id,
    },
  });

  throwNotFound({
    errorCheck: !old,
    entity: "Todo",
    reply,
  });

  const todo = await Todo.update({
    where: {
      id: parseFloat(id),
      userId: user!.id,
    },
    data: {
      title,
      description,
      time,
      score,
      completed,
    },
  });

  if (old!.score !== score || old!.completed !== completed) {
    await calculateScoreIfUpdated(user!);
  }

  return reply.send(todo);
};

export const deleteTodo: ControllerMethod = async (request, reply) => {
  const { id } = request.params as IdParamSchema;
  const { user } = request;

  const todo = await Todo.delete({
    where: {
      id: parseFloat(id),
      userId: user!.id,
    },
  });

  throwNotFound({
    entity: "Todo",
    reply,
  });

  return reply.send(todo);
};
