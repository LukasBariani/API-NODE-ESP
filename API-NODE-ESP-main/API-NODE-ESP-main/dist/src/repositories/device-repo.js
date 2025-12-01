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
exports.deleteDevice = exports.createDevice = exports.findDeviceByApiKey = exports.findDevicesByUserID = exports.findDeviceByID = exports.findAllDevices = void 0;
const deviceDatabase = [
    {
        id: 1,
        name: "Sensor Estufa 1",
        apiKey: "abc123",
        userId: 1,
        createdAt: new Date("2023-01-15T10:00:00Z"),
        updatedAt: new Date("2023-01-15T10:00:00Z")
    },
    {
        id: 2,
        name: "Sensor Sala",
        apiKey: "def456",
        userId: 2,
        createdAt: new Date("2023-02-20T15:30:00Z"),
        updatedAt: new Date("2023-02-20T15:30:00Z")
    }
];
// 🔹 Buscar todos os devices
const findAllDevices = () => __awaiter(void 0, void 0, void 0, function* () {
    return deviceDatabase;
});
exports.findAllDevices = findAllDevices;
// 🔹 Buscar um device pelo ID
const findDeviceByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const numericId = typeof id === "string" ? Number(id) : id;
    return deviceDatabase.find(device => device.id === numericId);
});
exports.findDeviceByID = findDeviceByID;
// 🔹 Buscar devices por usuário
const findDevicesByUserID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const numericUserId = typeof userId === "string" ? Number(userId) : userId;
    return deviceDatabase.filter(device => device.userId === numericUserId);
});
exports.findDevicesByUserID = findDevicesByUserID;
// 🔹 Buscar device pela apiKey (para quando o ESP mandar dados)
const findDeviceByApiKey = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    return deviceDatabase.find(device => device.apiKey === apiKey);
});
exports.findDeviceByApiKey = findDeviceByApiKey;
// 🔹 Criar novo device
const createDevice = (device) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = deviceDatabase.map(d => typeof d.id === "number" ? d.id : 0);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const newId = maxId + 1;
    const newDevice = Object.assign(Object.assign({}, device), { id: newId, createdAt: new Date(), updatedAt: new Date() });
    deviceDatabase.push(newDevice);
    return newDevice;
});
exports.createDevice = createDevice;
const deleteDevice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const numericId = typeof id === "string" ? Number(id) : id;
    const index = deviceDatabase.findIndex(device => device.id === numericId);
    if (index !== -1) {
        deviceDatabase.splice(index, 1);
        return true;
    }
    return false;
});
exports.deleteDevice = deleteDevice;
