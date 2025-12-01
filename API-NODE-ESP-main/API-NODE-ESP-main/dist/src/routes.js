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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("./controllers/user-controller"));
const deviceController = __importStar(require("./controllers/device-controller"));
const readingController = __importStar(require("./controllers/reading-controller"));
//import * as DeviceController from "./controllers/device-controller";
const router = (0, express_1.Router)();
// rotas users
router.get("/users", userController.getUser);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.postUser);
// rotas devices
router.get("/devices", deviceController.getDevice);
router.get("/devices/:id", deviceController.getDeviceById);
router.post("/devices", deviceController.postDevice);
router.delete("/devices/:id", deviceController.deleteDevice);
// rotas readings
router.get("/readings", readingController.getReadings);
router.get("/readings/device/:deviceId", readingController.getReadingsByDeviceId);
router.get("/readings/device/:deviceId/last", readingController.getLastReadingByDeviceId);
router.get("/readings/device/:deviceId/period", readingController.getReadingsByPeriod);
router.post("/readings", readingController.postReading);
// Rota especial para o ESP32 (usando API Key no header)
router.post("/esp/reading", readingController.postReading);
exports.default = router;
