import { BodySchema } from "@config/contants/types/request.type";

export const loginSchema: BodySchema<LoginDto> = {
  properties: {
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    },
  },
  required: ["email", "password"],
};

export type LoginDto = {
  email: string;
  password: string;
};
