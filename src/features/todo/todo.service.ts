import UserModel from "@features/auth";
import { User } from "@prisma/client";
import Todo from "./models/todo.model";

export const calculateScoreIfUpdated = async (user: User) => {
  const todos = await Todo.findMany({
    where: {
      userId: user.id,
    },
  });

  const score = todos.reduce((acc, todo) => {
    if (todo.completed) {
      return acc + todo.score;
    }
    return acc;
  }, 0);

  await UserModel.update({
    where: {
      id: user.id,
    },
    data: {
      score: score,
    },
  });
};
