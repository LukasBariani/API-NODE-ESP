import { Request, Response } from "express";
import * as service from "../services/reading-service";

export const getReadings = async (req: Request, res: Response) => {
  const httpResponse = await service.getReadingsService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getReadingsByDeviceId = async (req: Request, res: Response) => {
  const deviceId = parseInt(req.params.deviceId);
  const httpResponse = await service.getReadingsByDeviceIdService(deviceId);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getLastReadingByDeviceId = async (req: Request, res: Response) => {
  const deviceId = parseInt(req.params.deviceId);
  const httpResponse = await service.getLastReadingByDeviceIdService(deviceId);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const postReading = async (req: Request, res: Response) => {
  const bodyValue = req.body;
  const apiKey = req.headers['x-api-key'] as string;
  
  const httpResponse = await service.createReadingService(bodyValue, apiKey);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};



export const getReadingsByPeriod = async (req: Request, res: Response) => {
  const deviceId = parseInt(req.params.deviceId);
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: "startDate e endDate são obrigatórios" });
  }

  const httpResponse = await service.getReadingsByPeriodService(
    deviceId, 
    startDate as string, 
    endDate as string
  );
  res.status(httpResponse.statusCode).json(httpResponse.body);
};