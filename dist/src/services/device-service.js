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
exports.deleteDeviceService = exports.getDeviceByIdService = exports.createDeviceService = exports.getDeviceService = void 0;
const httpResponse = __importStar(require("../../utils/http-helper"));
const deviceRepository = __importStar(require("../repositories/device-repo"));
const getDeviceService = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deviceRepository.findAllDevices();
    let response = null;
    if (data) {
        response = yield httpResponse.ok(data);
    }
    else {
        response = yield httpResponse.noContent();
    }
    return response;
});
exports.getDeviceService = getDeviceService;
const createDeviceService = (device) => __awaiter(void 0, void 0, void 0, function* () {
    if (!device || Object.keys(device).length === 0) {
        return yield httpResponse.badRequest();
    }
    else {
        const createdDevice = yield deviceRepository.createDevice(device);
        console.log(createdDevice);
        return yield httpResponse.DeviceCreated(createdDevice);
    }
});
exports.createDeviceService = createDeviceService;
const getDeviceByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield deviceRepository.findDeviceByID(id);
    let response = null;
    if (data) {
        response = yield httpResponse.ok(data);
    }
    else {
        response = yield httpResponse.noContent();
    }
    return response;
});
exports.getDeviceByIdService = getDeviceByIdService;
const deleteDeviceService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield deviceRepository.deleteDevice(id);
    if (deleted) {
        return yield httpResponse.ok({ message: "Device deletado com sucesso" });
    }
    else {
        return yield httpResponse.notFound();
    }
});
exports.deleteDeviceService = deleteDeviceService;
