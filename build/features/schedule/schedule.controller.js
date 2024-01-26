"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedules = void 0;
const errors_1 = require("../../config/utils/errors/errors");
const getSchedules = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { user } = request;
    const schedules = user.schedules;
    if (id) {
        const schedule = schedules.find((schedule) => schedule.id === parseFloat(id));
        (0, errors_1.throwNotFound)({
            errorCheck: !schedule,
            entity: "Schedule",
            reply,
        });
        return reply.send(schedule);
    }
    else {
        return reply.send(schedules);
    }
});
exports.getSchedules = getSchedules;
