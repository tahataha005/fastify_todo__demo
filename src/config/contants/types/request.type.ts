export type BodySchema<T> = {
  properties: {
    [key in keyof T]: Property;
  };
  required?: (keyof T)[];
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
};
