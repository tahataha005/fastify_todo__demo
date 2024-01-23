import { BodySchema } from "@config/contants/types/request.type";

export type CreateTodoDto = {
  title: string;
  description: string;
  time: string;
};

export const createTodoSchema: BodySchema<CreateTodoDto> = {
  properties: {
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    time: { type: "string" },
  },
  required: ["title", "time"],
};
