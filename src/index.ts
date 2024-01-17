import fastify from "fastify";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({
  path: "enviroments/dev.env",
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
