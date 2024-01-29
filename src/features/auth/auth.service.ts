import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { throwBadRequest } from "../../config/utils/errors/errors";
import { User } from "@prisma/client";

type CheckPassword = {
  sentPassword: string;
  password: string;
  throwError?: boolean;
};

export const checkPassword: (params: CheckPassword) => void | boolean = ({
  sentPassword,
  password,
  throwError = true,
}) => {
  const check = bcrypt.compareSync(sentPassword, password);

  throwBadRequest({
    message: "Invalid credentials",
    errorCheck: throwError && !check,
  });

  return check;
};

export const generateToken = async (user: User) => {
  const token = jwt.sign(
    {
      id: user!.id,
      email: user!.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "10 days",
    }
  );

  const { password, ...data } = user!;

  return {
    token,
    userData: data,
  };
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};
