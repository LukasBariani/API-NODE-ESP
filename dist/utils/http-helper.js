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
exports.serverError = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = exports.DeviceCreated = exports.created = exports.noContent = exports.ok = void 0;
// Success: 200 OK
const ok = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 200,
        body: data,
    };
});
exports.ok = ok;
// Success: 204 No Content
const noContent = () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 204,
        body: null,
    };
});
exports.noContent = noContent;
// Success: 201 User Create
const created = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 201,
        body: null,
    };
});
exports.created = created;
// Success: 201 Device Create
const DeviceCreated = (createdDevice) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 201,
        body: null,
    };
});
exports.DeviceCreated = DeviceCreated;
// Client Error: 400 Bad Request
const badRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 400,
        body: null,
    };
});
exports.badRequest = badRequest;
// Client Error: 401 Unauthorized
const unauthorized = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (message = "Unauthorized") {
    return {
        statusCode: 401,
        body: { error: message },
    };
});
exports.unauthorized = unauthorized;
// Client Error: 403 Forbidden
const forbidden = (...args_2) => __awaiter(void 0, [...args_2], void 0, function* (message = "Forbidden") {
    return {
        statusCode: 403,
        body: { error: message },
    };
});
exports.forbidden = forbidden;
// Client Error: 404 Not Found
const notFound = (...args_3) => __awaiter(void 0, [...args_3], void 0, function* (message = "Not Found") {
    return {
        statusCode: 404,
        body: { error: message },
    };
});
exports.notFound = notFound;
// Server Error: 500 Internal Server Error
const serverError = (error) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 500,
        body: { error: error.message || "Internal Server Error" },
    };
});
exports.serverError = serverError;
