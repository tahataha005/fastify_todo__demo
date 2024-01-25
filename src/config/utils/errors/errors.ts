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
import { FastifyReply } from "fastify";

export const throwInternalError = (
  data: BaseErrorParams,
  reply: FastifyReply
) => {
  const { message } = data;

  return reply.status(INTERNAL_SERVER_ERROR).send({ message });
};

export const throwNotFound = (data: NotFoundParams) => {
  const { message, entity, errorCheck, reply } = data;

  if (errorCheck ?? true) {
    const entityString: string = entity !== null ? `${entity} ` : "";

    reply.status(NOT_FOUND).send({
      message: message ?? `${entityString}Not found`,
    });
  }
};

export const throwUnauthorized = (data: BaseErrorParams) => {
  const { message, errorCheck, reply } = data;

  if (errorCheck ?? true) {
    reply.status(UNAUTHORIZED).send({
      message: message ?? "Unauthorized",
    });
  }
};

export const throwForbidden = (data: ForbiddenParams) => {
  const { message, action, errorCheck, reply } = data;

  if (errorCheck ?? true) {
    const actionString: string = action !== null ? `${action} ` : "";

    reply.status(FORBIDDEN).send({
      message: message ?? `Forbidden ${actionString}`,
    });
  }
};

export const throwBadRequest = (data: BaseErrorParams) => {
  const { message, errorCheck, reply } = data;

  if (errorCheck ?? true) {
    reply.status(BAD_REQUEST).send({
      message: message ?? "Bad request",
    });
  }
};
