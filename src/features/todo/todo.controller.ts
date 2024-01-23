import { ControllerMethod } from "@config/contants/types/controller.type";
import { IdParamSchema } from "@config/contants/types/request.type";
import { throwNotFound } from "@config/utils/errors/errors";
import Todo from "@features/todo";

export const getTodo: ControllerMethod = async (request, reply) => {
  const { id } = request.params as IdParamSchema;
  const { user } = request;

  if (id) {
    const todo = await Todo.findUnique({ where: { id: parseFloat(id) } });

    throwNotFound({
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
  const { title, description, time } = request.body as {
    title: string;
    description: string;
    time: string;
  };

  const todo = await Todo.create({
    data: {
      title,
      description,
      time,
      score: 0,
      completed: false,
      userId: user!.id,
    },
  });

  return reply.send(todo);
};
