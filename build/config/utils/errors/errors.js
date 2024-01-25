"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwBadRequest = exports.throwForbidden = exports.throwUnauthorized = exports.throwNotFound = exports.throwInternalError = void 0;
const errors_variables_1 = require("../../../config/contants/variables/errors.variables");
const throwInternalError = (data, reply) => {
    const { message } = data;
    return reply.status(errors_variables_1.INTERNAL_SERVER_ERROR).send({ message });
};
exports.throwInternalError = throwInternalError;
const throwNotFound = (data) => {
    const { message, entity, errorCheck, reply } = data;
    if (errorCheck !== null && errorCheck !== void 0 ? errorCheck : true) {
        const entityString = entity !== null ? `${entity} ` : "";
        reply.status(errors_variables_1.NOT_FOUND).send({
            message: message !== null && message !== void 0 ? message : `${entityString}Not found`,
        });
    }
};
exports.throwNotFound = throwNotFound;
const throwUnauthorized = (data) => {
    const { message, errorCheck, reply } = data;
    if (errorCheck !== null && errorCheck !== void 0 ? errorCheck : true) {
        reply.status(errors_variables_1.UNAUTHORIZED).send({
            message: message !== null && message !== void 0 ? message : "Unauthorized",
        });
    }
};
exports.throwUnauthorized = throwUnauthorized;
const throwForbidden = (data) => {
    const { message, action, errorCheck, reply } = data;
    if (errorCheck !== null && errorCheck !== void 0 ? errorCheck : true) {
        const actionString = action !== null ? `${action} ` : "";
        reply.status(errors_variables_1.FORBIDDEN).send({
            message: message !== null && message !== void 0 ? message : `Forbidden ${actionString}`,
        });
    }
};
exports.throwForbidden = throwForbidden;
const throwBadRequest = (data) => {
    const { message, errorCheck, reply } = data;
    if (errorCheck !== null && errorCheck !== void 0 ? errorCheck : true) {
        reply.status(errors_variables_1.BAD_REQUEST).send({
            message: message !== null && message !== void 0 ? message : "Bad request",
        });
    }
};
exports.throwBadRequest = throwBadRequest;
