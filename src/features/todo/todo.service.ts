import UserModel from "../../features/auth";
import { Todo, User } from "@prisma/client";
import TodoModel from "./models/todo.model";

export const recalculateScoreChecker = async (
  todo: Todo,
  user: User,
  score: number | undefined,
  completed: boolean | undefined
) => {
  if (todo.score !== score || todo.completed !== completed) {
    const todos = await TodoModel.findMany({
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
  }
};
