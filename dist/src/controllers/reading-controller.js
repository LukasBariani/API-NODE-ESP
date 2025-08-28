"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getReadingsByPeriod = exports.postReading = exports.getLastReadingByDeviceId = exports.getReadingsByDeviceId = exports.getReadings = void 0;
const service = __importStar(require("../services/reading-service"));
const getReadings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const httpResponse = yield service.getReadingsService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
});
exports.getReadings = getReadings;
const getReadingsByDeviceId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = parseInt(req.params.deviceId);
    const httpResponse = yield service.getReadingsByDeviceIdService(deviceId);
    res.status(httpResponse.statusCode).json(httpResponse.body);
});
exports.getReadingsByDeviceId = getReadingsByDeviceId;
const getLastReadingByDeviceId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = parseInt(req.params.deviceId);
    const httpResponse = yield service.getLastReadingByDeviceIdService(deviceId);
    res.status(httpResponse.statusCode).json(httpResponse.body);
});
exports.getLastReadingByDeviceId = getLastReadingByDeviceId;
const postReading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyValue = req.body;
    const apiKey = req.headers['x-api-key'];
    const httpResponse = yield service.createReadingService(bodyValue, apiKey);
    res.status(httpResponse.statusCode).json(httpResponse.body);
});
exports.postReading = postReading;
const getReadingsByPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = parseInt(req.params.deviceId);
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate e endDate são obrigatórios" });
    }
    const httpResponse = yield service.getReadingsByPeriodService(deviceId, startDate, endDate);
    res.status(httpResponse.statusCode).json(httpResponse.body);
});
exports.getReadingsByPeriod = getReadingsByPeriod;
