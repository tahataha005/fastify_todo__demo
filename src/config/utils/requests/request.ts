import {
  BodySchema,
  IdParamSchema,
  ParamsSchema,
} from "../../../config/contants/types/request.type";
import { OBJECT } from "../../../config/contants/variables/contants.variables";

export const bodySchemaBuilder = <T>(schema: BodySchema<T>) => {
  return {
    body: {
      ...schema,
      type: OBJECT,
    },
  };
};

export const paramsSchemaBuilder = <T>(schema: ParamsSchema<T>) => {
  return {
    params: {
      ...schema,
      type: OBJECT,
    },
  };
};

export const IdParam: ParamsSchema<IdParamSchema> = {
  properties: {
    id: { type: "string" },
  },
  type: OBJECT,
};
