import { BodySchema } from "../../../config/contants/types/request.type";

export type UpdateTodoDto = {
  title?: string;
  description?: string;
  time?: string;
  score?: number;
  completed?: boolean;
};

export const updateTodoSchema: BodySchema<UpdateTodoDto> = {
  properties: {
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    time: { type: "string" },
    completed: { type: "boolean" },
    score: { type: "number" },
  },
  required: [],
};
