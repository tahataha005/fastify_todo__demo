import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const logged = `
~ ~🚀-🚀~ ~ Caught Error: ${error.name}
-- status: ${error.statusCode}
-- message: ${error.message}
-- at ${new Date()}

request was: - path ${request.url}
             - body ${JSON.stringify(request.body)}
             - params ${JSON.stringify(request.params)}

stack: ${error.stack}

~ ~🚀-🚀~ ~
  `;

  console.log(logged);

  return reply.status(error.statusCode ?? 500).send({
    statusCode: error.statusCode,
    message: error.message,
    error: error.name,
  });
};
