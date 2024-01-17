import { RouteGroup } from "@config/contants/types/route.types";
import { bodySchemaBuilder } from "@config/utils/requests/request";

import { loginSchema, LoginDto } from "@features/auth/schemas/login.req.schema";
import { login } from "@features/auth";

export const authRoutes: RouteGroup = (app, options, done) => {
  app.post("/login", {
    handler: login,
    schema: bodySchemaBuilder<LoginDto>(loginSchema),
  });

  done();
};
