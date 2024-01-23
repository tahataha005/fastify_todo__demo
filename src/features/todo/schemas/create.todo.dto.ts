import { BodySchema } from "@config/contants/types/request.type";

export type CreateTodoDto = {
  title: string;
  description: string;
  time: string;
  score: number;
};

export const createTodoSchema: BodySchema<CreateTodoDto> = {
  properties: {
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    time: { type: "string" },
    score: { type: "number" },
  },
  required: ["title", "time"],
};
