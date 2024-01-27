import { BodySchema } from "@config/contants/types/request.type";

export interface CreateScheduleDto {
  day: Date;
  todos: number[];
}

export const createScheduleSchema: BodySchema<CreateScheduleDto> = {
  properties: {
    day: { type: "string" },
    todos: { type: "array", items: { type: "number" } },
  },
  required: ["day", "todos"],
};
