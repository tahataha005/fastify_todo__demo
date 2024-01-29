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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = __importDefault(require("../../features/auth"));
const errors_1 = require("../../config/utils/errors/errors");
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
    const check = bcrypt_1.default.compareSync(sentPassword, user.password);
    (0, errors_1.throwBadRequest)({
        message: "Invalid credentials",
        errorCheck: !check,
    });
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: "10 days",
    });
    const _a = user, { password } = _a, data = __rest(_a, ["password"]);
    return reply.status(200).send({
        token,
        user: data,
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
    const salt = bcrypt_1.default.genSaltSync(10);
    const hashed = bcrypt_1.default.hashSync(password, salt);
    const user = yield auth_1.default.create({
        data: {
            email,
            password: hashed,
            firstName,
            lastName,
            score: 0,
        },
    });
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET);
    return reply.status(201).send({
        token,
        user,
    });
});
exports.register = register;
