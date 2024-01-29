import dotenv from "dotenv";
import app from "./app";
import { registerRouteGroup } from "./config/utils/routes/route";
import { authRoutes } from "./features/auth";
import { todoRoutes } from "./features/todo";
import { welcomeRoute } from "./config/contants/variables/welcome.route";
import { scheduleRoutes } from "./features/schedule";

dotenv.config({
  path: "src/config/settings/enviroments/.env.development",
});

registerRouteGroup("/auth", authRoutes);
registerRouteGroup("/todo", todoRoutes);
registerRouteGroup("/schedule", scheduleRoutes);

app.route({
  ...welcomeRoute,
});

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
