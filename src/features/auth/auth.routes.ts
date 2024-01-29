import { RouteGroup } from "../../config/contants/types/route.types";
import { routeHandler } from "../../config/utils/routes/route";

import {
  loginSchema,
  LoginDto,
} from "../../features/auth/schemas/login.req.schema";
import { RegisterDto, registerSchema } from "./schemas/register.req";
import { login, register } from "../../features/auth";

export const authRoutes: RouteGroup = (app, options, done) => {
  app.post("/login", routeHandler<LoginDto, {}>(login, { body: loginSchema }));

  app.post(
    "/register",
    routeHandler<RegisterDto, {}>(register, { body: registerSchema })
  );

  done();
};
