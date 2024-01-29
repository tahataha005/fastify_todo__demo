import { Schedule, Todo } from "@prisma/client";

export const checkUniqueDay = (schedules: Schedule[], day: Date) => {
  const check = schedules.some((schedule) => {
    const current = schedule.day;

    return current.toDateString() === day.toDateString();
  });

  return check;
};

export const checkUniqueTodos = (
  schedules: (Schedule & { todos: Todo[] })[],
  todos: number[]
) => {
  const todoIds = new Set(todos);

  const check = schedules.some((schedule) =>
    schedule.todos.some((todo) => todoIds.has(todo.id))
  );

  return check;
};
