import { BodySchema } from "@config/contants/types/request.type";

export type UpdateScheduleDto = {
  day: Date;
  todos: number[];
  toDelete: number[];
};

export const updateScheduleSchema: BodySchema<UpdateScheduleDto> = {
  properties: {
    day: { type: "string" },
    todos: { type: "array", items: { type: "number" } },
    toDelete: { type: "array", items: { type: "number" } },
  },
  required: [],
};
