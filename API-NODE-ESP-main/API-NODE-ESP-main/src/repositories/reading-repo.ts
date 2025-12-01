import { Reading } from "../models/reading-model";

// 🔹 Buscar todas as readings
export const findAllReadings = async () => {
  return await Reading.findAll();
};

// 🔹 Buscar readings por device ID
export const findReadingsByDeviceId = async (deviceId: number) => {
  return await Reading.findAll({ where: { deviceId } });
};

// 🔹 Buscar última reading de um device
export const findLastReadingByDeviceId = async (deviceId: number) => {
  return await Reading.findOne({
    where: { deviceId },
    order: [["createdAt", "DESC"]],
  });
};

// 🔹 Criar nova reading
export const createReading = async (reading: {
  deviceId: number;
  temperature: number;
  humidity: number;
  luminosity: number;
  gas:number;
  
}) => {
  return await Reading.create(reading);
};

// 🔹 Buscar readings por período
export const findReadingsByPeriod = async (deviceId: number, startDate: Date, endDate: Date) => {
  return await Reading.findAll({
    where: {
      deviceId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
};

// 🔹 Deletar readings de um device
export const deleteReadingsByDeviceId = async (deviceId: number) => {
  return await Reading.destroy({ where: { deviceId } });
};
