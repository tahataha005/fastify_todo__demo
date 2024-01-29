"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdParam = exports.paramsSchemaBuilder = exports.bodySchemaBuilder = void 0;
const contants_variables_1 = require("../../../config/contants/variables/contants.variables");
const bodySchemaBuilder = (schema) => {
    return {
        body: Object.assign(Object.assign({}, schema), { type: contants_variables_1.OBJECT }),
    };
};
exports.bodySchemaBuilder = bodySchemaBuilder;
const paramsSchemaBuilder = (schema) => {
    return {
        params: Object.assign(Object.assign({}, schema), { type: contants_variables_1.OBJECT }),
    };
};
exports.paramsSchemaBuilder = paramsSchemaBuilder;
exports.IdParam = {
    properties: {
        id: { type: "string" },
    },
    type: contants_variables_1.OBJECT,
};
