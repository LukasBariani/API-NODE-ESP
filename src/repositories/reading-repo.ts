// repositories/reading-repo.ts
import { ReadingModel } from "../models/reading-model";

const readingDatabase: ReadingModel[] = [];

// 🔹 Buscar todas as readings
export const findAllReadings = async (): Promise<ReadingModel[]> => {
  return readingDatabase;
};

// 🔹 Buscar readings por device ID
export const findReadingsByDeviceId = async (deviceId: number): Promise<ReadingModel[]> => {
  return readingDatabase.filter(reading => reading.deviceId === deviceId);
};

// 🔹 Buscar última reading de um device
export const findLastReadingByDeviceId = async (deviceId: number): Promise<ReadingModel | undefined> => {
  const deviceReadings = readingDatabase.filter(reading => reading.deviceId === deviceId);
  return deviceReadings.sort((a, b) => 
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  )[0];
};

// 🔹 Criar nova reading
export const createReading = async (reading: ReadingModel): Promise<ReadingModel> => {
  const ids = readingDatabase.map(r => r.id || 0);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const newId = maxId + 1;

  const newReading: ReadingModel = {
    ...reading,
    id: newId,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  readingDatabase.push(newReading);
  return newReading;
};

// 🔹 Buscar readings por período
export const findReadingsByPeriod = async (deviceId: number, startDate: Date, endDate: Date): Promise<ReadingModel[]> => {
  return readingDatabase.filter(reading => 
    reading.deviceId === deviceId &&
    reading.createdAt &&
    reading.createdAt >= startDate &&
    reading.createdAt <= endDate
  );
};

// 🔹 Deletar readings de um device
export const deleteReadingsByDeviceId = async (deviceId: number): Promise<number> => {
  const initialLength = readingDatabase.length;
  for (let i = readingDatabase.length - 1; i >= 0; i--) {
    if (readingDatabase[i].deviceId === deviceId) {
      readingDatabase.splice(i, 1);
    }
  }
  return initialLength - readingDatabase.length;
};