import { ControllerMethod } from "@config/contants/types/controller.type";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@features/auth";

import { LoginDto } from "./schemas/login.req.schema";
import { RegisterDto } from "./schemas/register.req";
import { throwBadRequest } from "@config/utils/errors/errors";

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
    reply,
  });

  const check = bcrypt.compareSync(sentPassword, user!.password);

  throwBadRequest({
    message: "Invalid credentials",
    errorCheck: !check,
    reply,
  });

  const token = jwt.sign(
    {
      id: user!.id,
      email: user!.email,
    },
    process.env.JWT_SECRET!
  );

  const { password, ...data } = user!;

  return reply.status(200).send({
    token,
    user: data,
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
    reply,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);

  const user = await User.create({
    data: {
      email,
      password: hashed,
      firstName,
      lastName,
      score: 0,
    },
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!
  );

  return reply.status(201).send({
    token,
    user,
  });
};
