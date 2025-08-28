// services/reading-service.ts
import * as httpResponse from "../../utils/http-helper";
import * as readingRepository from "../repositories/reading-repo";
import { ReadingModel } from "../models/reading-model";
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

export const createReadingService = async (reading: ReadingModel | undefined, apiKey?: string) => {
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

  // Validações básicas
  if (reading.temperature < -50 || reading.temperature > 100) {
    console.log("Temperatura fora do range válido (-50 a 100)");
    return await httpResponse.badRequest();
  }

  if (reading.humidity < 0 || reading.humidity > 100) {
    console.log("Umidade fora do range válido (0 a 100)");
    
    return await httpResponse.badRequest();
  }

  const createdReading = await readingRepository.createReading(reading);
  return await httpResponse.created(createdReading);
};

export const getReadingsByPeriodService = async (deviceId: number, startDate: string, endDate: string) => {
  const device = await deviceRepository.findDeviceByID(deviceId);
  if (!device) {
    return await httpResponse.notFound("Device não encontrado");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.log("Datas inválidas");
    
    return await httpResponse.badRequest();
  }

  const data = await readingRepository.findReadingsByPeriod(deviceId, start, end);
  return data.length > 0 ? await httpResponse.ok(data) : await httpResponse.noContent();
};