import { throwUnauthorized } from "../../../config/utils/errors/errors";
import jwt from "jsonwebtoken";
import User from "../../../features/auth";
import { MiddlewareMethod } from "../../../config/contants/types/middleware.type";

type CustomPayload = {
  id: number;
  email: string;
};

export const authMiddleware: MiddlewareMethod = async (
  request,
  reply,
  done
) => {
  const { authorization } = request.headers;

  throwUnauthorized({
    errorCheck: !authorization,
  });

  const splitted = authorization!.split(" ");

  throwUnauthorized({
    errorCheck: splitted.length !== 2,
  });

  const [type, token] = splitted;

  throwUnauthorized({
    errorCheck: type !== "Bearer",
  });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomPayload;

    throwUnauthorized({
      errorCheck: !decoded,
    });

    const user = await User.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        todos: true,
        schedules: {
          include: {
            todos: true,
          },
        },
      },
    });

    throwUnauthorized({
      errorCheck: !user,
    });

    request.user = user;
  } catch (error) {
    throwUnauthorized({
      message: "Invalid token",
    });
  }
};
