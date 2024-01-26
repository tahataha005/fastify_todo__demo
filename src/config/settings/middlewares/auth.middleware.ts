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
    reply,
    errorCheck: !authorization,
  });

  const splitted = authorization!.split(" ");

  throwUnauthorized({
    reply,
    errorCheck: splitted.length !== 2,
  });

  const [type, token] = splitted;

  throwUnauthorized({
    reply,
    errorCheck: type !== "Bearer",
  });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomPayload;

    throwUnauthorized({
      reply,
      errorCheck: !decoded,
    });

    const user = await User.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        todos: true,
        schedules: true,
      },
    });

    throwUnauthorized({
      reply,
      errorCheck: !user,
    });

    request.user = user;

    done();
  } catch (error) {
    throwUnauthorized({
      reply,
      message: "Invalid token",
    });
  }
};
