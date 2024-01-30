import dotenv from "dotenv";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";
import fastify from "fastify";

import { welcomeRoute } from "./config/contants/variables/welcome.route";
import { errorHandler } from "./config/utils/errors/global.error.handler";

dotenv.config({
  path: "src/config/settings/enviroments/.env.development",
});

const app = fastify();

app.route({
  ...welcomeRoute,
});

app.register(sensible);
app.register(cors, {
  origin: "http://localhost:3000",
});

app.setErrorHandler(errorHandler);

export default app;
