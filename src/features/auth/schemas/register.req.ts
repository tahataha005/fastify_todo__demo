import { BodySchema } from "@config/contants/types/request.type";

export type RegisterDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerSchema: BodySchema<RegisterDto> = {
  properties: {
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 32,
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    },
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
  },
  required: ["email", "password", "firstName", "lastName"],
};
