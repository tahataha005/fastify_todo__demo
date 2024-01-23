import { ControllerMethod } from "@config/contants/types/controller.type";
import { IdParam } from "@config/utils/requests/request";
import { throwNotFound } from "@config/utils/errors/errors";
import Todo from "@features/todo";

export const getTodo: ControllerMethod = async (request, reply) => {
  const { id } = request.params as IdParam;
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
