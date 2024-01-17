import { ControllerMethod } from "../../config/contants/types/controller.type";
import { LoginDto } from "./schemas/login.req.schema";

export const login: ControllerMethod = async (request, reply) => {
  const { email, password } = request.body as LoginDto;

  if (!email || !password) {
    return reply.status(404).send({
      message: "User not found",
    });
  }

  return reply.status(200).send({
    message: "Login successful",
    user: {
      email,
      password,
    },
  });
};
