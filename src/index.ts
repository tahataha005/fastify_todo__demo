import app from "./app";

import { registerRouteGroup } from "./config/utils/routes/route";
import { authRoutes } from "./features/auth";
import { todoRoutes } from "./features/todo";
import { scheduleRoutes } from "./features/schedule";

registerRouteGroup("/auth", authRoutes);
registerRouteGroup("/todo", todoRoutes);
registerRouteGroup("/schedule", scheduleRoutes);

app.listen(
  {
    port: parseInt(process.env.SERVER_PORT!),
    host: process.env.SERVER_HOST,
  },
  (err, address) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening at ${address}`);
  }
);
