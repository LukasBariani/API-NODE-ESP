import { Device } from "../models/device-model";

export const findAllDevices = async () => {
  return await Device.findAll();
};

export const findDeviceByID = async (id: number) => {
  return await Device.findByPk(id);
};

export const findDevicesByUserID = async (userId: number) => {
  return await Device.findAll({ where: { userId } });
};

export const findDeviceByApiKey = async (apiKey: string) => {
  return await Device.findOne({ where: { apiKey } });
};

export const createDevice = async (data: any) => {
  return await Device.create(data);
};

export const deleteDevice = async (id: number) => {
  const deleted = await Device.destroy({ where: { id } });
  return deleted > 0;
};
