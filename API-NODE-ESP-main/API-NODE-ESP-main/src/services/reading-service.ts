// services/reading-service.ts
import * as httpResponse from "../../utils/http-helper";
import * as readingRepository from "../repositories/reading-repo";
import { Reading } from "../models/reading-model";
import * as deviceRepository from "../repositories/device-repo";

export const getReadingsService = async () => {
  const data = await readingRepository.findAllReadings();
  return data.length > 0 ? await httpResponse.ok(data) : await httpResponse.noContent();
};

export const getReadingsByDeviceIdService = async (deviceId: number) => {
  const device = await deviceRepository.findDeviceByID(deviceId);
  if (!device) {
    return await httpResponse.notFound("Device não encontrado");
  }

  const data = await readingRepository.findReadingsByDeviceId(deviceId);
  return data.length > 0 ? await httpResponse.ok(data) : await httpResponse.noContent();
};

export const getLastReadingByDeviceIdService = async (deviceId: number) => {
  const device = await deviceRepository.findDeviceByID(deviceId);
  if (!device) {
    return await httpResponse.notFound("Device não encontrado");
  }

  const data = await readingRepository.findLastReadingByDeviceId(deviceId);
  return data ? await httpResponse.ok(data) : await httpResponse.noContent();
};

export const createReadingService = async (reading: any, apiKey?: string) => {
  if (!reading || Object.keys(reading).length === 0) {
    console.log("Dados da reading são obrigatórios");
    return await httpResponse.badRequest();
  }

  // Verificar se o device existe
  const device = apiKey 
    ? await deviceRepository.findDeviceByApiKey(apiKey)
    : await deviceRepository.findDeviceByID(reading.deviceId);

  if (!device) {
    return await httpResponse.notFound("Device não encontrado");
  }

  // Se veio por API key, usar o deviceId correto
  if (apiKey) {
    reading.deviceId = device.id as number;
  }

  // 🔹 Mapeia os campos que o ESP envia
  const normalizedReading = {
    temperature: reading.temperature,
    humidity: reading.humidity,
    luminosity: reading.ldr ?? 0,
    gas: reading.mq135 ?? 0,
    deviceId: reading.deviceId
  };

  // Validações básicas
  if (normalizedReading.temperature < -50 || normalizedReading.temperature > 100) {
    console.log("Temperatura fora do range válido (-50 a 100)");
    return await httpResponse.badRequest();
  }

  if (normalizedReading.humidity < 0 || normalizedReading.humidity > 100) {
    console.log("Umidade fora do range válido (0 a 100)");
    return await httpResponse.badRequest();
  }

  // Criar no banco
  const createdReading = await readingRepository.createReading(normalizedReading as Reading);
  return await httpResponse.created(createdReading);
};
