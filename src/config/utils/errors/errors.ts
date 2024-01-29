import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../../../config/contants/variables/errors.variables";
import {
  BaseErrorParams,
  ForbiddenParams,
  NotFoundParams,
} from "../../../config/contants/types/base.error.types";
import app from "../../../app";

export const throwInternalError = (data: BaseErrorParams) => {
  const { message } = data;

  return app.httpErrors.internalServerError(message);
};

export const throwNotFound = (data: NotFoundParams) => {
  const { message, entity, errorCheck } = data;

  if (errorCheck ?? true) {
    const entityString: string = entity !== null ? `${entity} ` : "";

    throw app.httpErrors.notFound(message ?? `${entityString}Not found`);
  }
};

export const throwUnauthorized = (data: BaseErrorParams) => {
  const { message, errorCheck } = data;

  if (errorCheck ?? true) {
    throw app.httpErrors.unauthorized(message ?? "Unauthorized");
  }
};

export const throwForbidden = (data: ForbiddenParams) => {
  const { message, action, errorCheck } = data;

  if (errorCheck ?? true) {
    const actionString: string = action !== null ? `${action} ` : "";

    throw app.httpErrors.forbidden(message ?? `Forbidden ${actionString}`);
  }
};

export const throwBadRequest = (data: BaseErrorParams) => {
  const { message, errorCheck } = data;

  if (errorCheck ?? true) {
    throw app.httpErrors.badRequest(message ?? "Bad request");
  }
};
