"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwBadRequest = exports.throwForbidden = exports.throwUnauthorized = exports.throwNotFound = exports.throwInternalError = void 0;
const app_1 = __importDefault(require("../../../app"));
const throwInternalError = (data) => {
    const { message } = data;
    return app_1.default.httpErrors.internalServerError(message);
};
exports.throwInternalError = throwInternalError;
const throwNotFound = (data) => {
    const { message, entity, errorCheck } = data;
    if (errorCheck !== null && errorCheck !== void 0 ? errorCheck : true) {
        const entityString = entity !== null ? `${entity} ` : "";
        throw app_1.default.httpErrors.notFound(message !== null && message !== void 0 ? message : `${entityString}Not found`);
    }
};
exports.throwNotFound = throwNotFound;
const throwUnauthorized = (data) => {
    const { message, errorCheck } = data;
    if (errorCheck !== null && errorCheck !== void 0 ? errorCheck : true) {
        throw app_1.default.httpErrors.unauthorized(message !== null && message !== void 0 ? message : "Unauthorized");
    }
};
exports.throwUnauthorized = throwUnauthorized;
const throwForbidden = (data) => {
    const { message, action, errorCheck } = data;
    if (errorCheck !== null && errorCheck !== void 0 ? errorCheck : true) {
        const actionString = action !== null ? `${action} ` : "";
        throw app_1.default.httpErrors.forbidden(message !== null && message !== void 0 ? message : `Forbidden ${actionString}`);
    }
};
exports.throwForbidden = throwForbidden;
const throwBadRequest = (data) => {
    const { message, errorCheck } = data;
    if (errorCheck !== null && errorCheck !== void 0 ? errorCheck : true) {
        throw app_1.default.httpErrors.badRequest(message !== null && message !== void 0 ? message : "Bad request");
    }
};
exports.throwBadRequest = throwBadRequest;
