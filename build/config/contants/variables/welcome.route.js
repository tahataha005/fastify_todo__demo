"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeRoute = void 0;
exports.welcomeRoute = {
    method: "GET",
    url: "/",
    handler: (request, reply) => {
        return reply.send("Hello World");
    },
};
