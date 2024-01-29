import sensible from "@fastify/sensible";
import fastify from "fastify";

const app = fastify();

app.register(sensible);

export default app;
