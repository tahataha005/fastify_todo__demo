export type BodySchema<T> = {
  properties: Properties<T>;
  required?: (keyof T)[];
};

export type IdParamSchema = {
  id: string;
};

export type ParamsSchema<T> = {
  properties: Properties<T>;
  type: "object";
};

export type Properties<T> = {
  [key in keyof T]: Property;
};

export type Property = {
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "null"
    | "integer";
  format?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  items?: Property;
};
