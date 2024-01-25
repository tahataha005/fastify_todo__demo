import { BodySchema } from "../../../config/contants/types/request.type";

export type LoginDto = {
  email: string;
  sentPassword: string;
};

export const loginSchema: BodySchema<LoginDto> = {
  properties: {
    email: { type: "string", format: "email" },
    sentPassword: { type: "string" },
  },
  required: ["email", "sentPassword"],
};
