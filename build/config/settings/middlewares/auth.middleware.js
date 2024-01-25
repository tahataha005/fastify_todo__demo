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
exports.authMiddleware = void 0;
const errors_1 = require("../../../config/utils/errors/errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../../features/auth"));
const authMiddleware = (request, reply, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = request.headers;
    (0, errors_1.throwUnauthorized)({
        reply,
        errorCheck: !authorization,
    });
    const splitted = authorization.split(" ");
    (0, errors_1.throwUnauthorized)({
        reply,
        errorCheck: splitted.length !== 2,
    });
    const [type, token] = splitted;
    (0, errors_1.throwUnauthorized)({
        reply,
        errorCheck: type !== "Bearer",
    });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        (0, errors_1.throwUnauthorized)({
            reply,
            errorCheck: !decoded,
        });
        const user = yield auth_1.default.findUnique({
            where: {
                id: decoded.id,
            },
        });
        (0, errors_1.throwUnauthorized)({
            reply,
            errorCheck: !user,
        });
        request.user = user;
        done();
    }
    catch (error) {
        (0, errors_1.throwUnauthorized)({
            reply,
            message: "Invalid token",
        });
    }
});
exports.authMiddleware = authMiddleware;
