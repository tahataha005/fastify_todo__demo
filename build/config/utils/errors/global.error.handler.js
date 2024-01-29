"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, request, reply) => {
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
    return reply.send({
        statusCode: error.statusCode,
        message: error.message,
        error: error.name,
    });
};
exports.errorHandler = errorHandler;
