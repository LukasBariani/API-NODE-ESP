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
exports.deleteReadingsByDeviceId = exports.findReadingsByPeriod = exports.createReading = exports.findLastReadingByDeviceId = exports.findReadingsByDeviceId = exports.findAllReadings = void 0;
const readingDatabase = [];
// 🔹 Buscar todas as readings
const findAllReadings = () => __awaiter(void 0, void 0, void 0, function* () {
    return readingDatabase;
});
exports.findAllReadings = findAllReadings;
// 🔹 Buscar readings por device ID
const findReadingsByDeviceId = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    return readingDatabase.filter(reading => reading.deviceId === deviceId);
});
exports.findReadingsByDeviceId = findReadingsByDeviceId;
// 🔹 Buscar última reading de um device
const findLastReadingByDeviceId = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceReadings = readingDatabase.filter(reading => reading.deviceId === deviceId);
    return deviceReadings.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0];
});
exports.findLastReadingByDeviceId = findLastReadingByDeviceId;
// 🔹 Criar nova reading
const createReading = (reading) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = readingDatabase.map(r => r.id || 0);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const newId = maxId + 1;
    const newReading = Object.assign(Object.assign({}, reading), { id: newId, createdAt: new Date(), updatedAt: new Date() });
    readingDatabase.push(newReading);
    return newReading;
});
exports.createReading = createReading;
// 🔹 Buscar readings por período
const findReadingsByPeriod = (deviceId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    return readingDatabase.filter(reading => reading.deviceId === deviceId &&
        reading.createdAt &&
        reading.createdAt >= startDate &&
        reading.createdAt <= endDate);
});
exports.findReadingsByPeriod = findReadingsByPeriod;
// 🔹 Deletar readings de um device
const deleteReadingsByDeviceId = (deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const initialLength = readingDatabase.length;
    for (let i = readingDatabase.length - 1; i >= 0; i--) {
        if (readingDatabase[i].deviceId === deviceId) {
            readingDatabase.splice(i, 1);
        }
    }
    return initialLength - readingDatabase.length;
});
exports.deleteReadingsByDeviceId = deleteReadingsByDeviceId;
