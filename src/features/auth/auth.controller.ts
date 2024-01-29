import { ControllerMethod } from "../../config/contants/types/controller.type";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../features/auth";

import { LoginDto } from "./schemas/login.req.schema";
import { RegisterDto } from "./schemas/register.req";
import { throwBadRequest } from "../../config/utils/errors/errors";
import { checkPassword, generateToken, hashPassword } from "./auth.service";

export const login: ControllerMethod = async (request, reply) => {
  const { email, sentPassword } = request.body as LoginDto;

  const user = await User.findUnique({
    where: {
      email,
    },
  });

  throwBadRequest({
    message: "Invalid credentials",
    errorCheck: !user,
  });

  checkPassword({
    sentPassword,
    password: user!.password,
  });

  const { token, userData } = await generateToken(user!);

  return reply.status(200).send({
    token,
    user: userData,
  });
};

export const register: ControllerMethod = async (request, reply) => {
  const { email, password, firstName, lastName } = request.body as RegisterDto;

  const check = await User.findFirst({
    where: {
      email,
    },
  });

  throwBadRequest({
    message: "Email already exists",
    errorCheck: check !== null,
  });

  const hashed = await hashPassword(password);

  const user = await User.create({
    data: {
      email,
      password: hashed,
      firstName,
      lastName,
      score: 0,
    },
  });

  const { token, userData } = await generateToken(user);

  return reply.status(201).send({
    token,
    userData,
  });
};
