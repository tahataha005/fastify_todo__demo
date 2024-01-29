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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const auth_1 = __importDefault(require("../../features/auth"));
const errors_1 = require("../../config/utils/errors/errors");
const auth_service_1 = require("./auth.service");
const login = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, sentPassword } = request.body;
    const user = yield auth_1.default.findUnique({
        where: {
            email,
        },
    });
    (0, errors_1.throwBadRequest)({
        message: "Invalid credentials",
        errorCheck: !user,
    });
    (0, auth_service_1.checkPassword)({
        sentPassword,
        password: user.password,
    });
    const { token, userData } = yield (0, auth_service_1.generateToken)(user);
    return reply.status(200).send({
        token,
        user: userData,
    });
});
exports.login = login;
const register = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = request.body;
    const check = yield auth_1.default.findFirst({
        where: {
            email,
        },
    });
    (0, errors_1.throwBadRequest)({
        message: "Email already exists",
        errorCheck: check !== null,
    });
    const hashed = yield (0, auth_service_1.hashPassword)(password);
    const user = yield auth_1.default.create({
        data: {
            email,
            password: hashed,
            firstName,
            lastName,
            score: 0,
        },
    });
    const { token, userData } = yield (0, auth_service_1.generateToken)(user);
    return reply.status(201).send({
        token,
        userData,
    });
});
exports.register = register;
