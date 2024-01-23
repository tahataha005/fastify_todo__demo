import { BodySchema } from "@config/contants/types/request.type";
import { OBJECT } from "@config/contants/variables/contants.variables";

export const bodySchemaBuilder = <T>(schema: BodySchema<T>) => {
  return {
    body: {
      ...schema,
      type: OBJECT,
    },
  };
};

export type IdParam = {
  id: string;
};
