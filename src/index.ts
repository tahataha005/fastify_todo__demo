import dotenv from "dotenv";
import app from "./app";
import { registerRouteGroup } from "./config/utils/routes/route";
import { authRoutes } from "./features/auth";

dotenv.config({
  path: ".env",
});

registerRouteGroup("/auth", authRoutes);

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
