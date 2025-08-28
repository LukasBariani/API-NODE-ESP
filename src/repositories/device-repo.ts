import { DeviceModel } from "../models/device-model";

const deviceDatabase: DeviceModel[] = [
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
export const findAllDevices = async (): Promise<DeviceModel[]> => {
  return deviceDatabase;
};

// 🔹 Buscar um device pelo ID
export const findDeviceByID = async (id: string | number): Promise<DeviceModel | undefined> => {
  const numericId = typeof id === "string" ? Number(id) : id;
  return deviceDatabase.find(device => device.id === numericId);
};

// 🔹 Buscar devices por usuário
export const findDevicesByUserID = async (userId: string | number): Promise<DeviceModel[]> => {
  const numericUserId = typeof userId === "string" ? Number(userId) : userId;
  return deviceDatabase.filter(device => device.userId === numericUserId);
};

// 🔹 Buscar device pela apiKey (para quando o ESP mandar dados)
export const findDeviceByApiKey = async (apiKey: string): Promise<DeviceModel | undefined> => {
  return deviceDatabase.find(device => device.apiKey === apiKey);
};

// 🔹 Criar novo device
export const createDevice = async (device: DeviceModel): Promise<DeviceModel> => {
  const ids = deviceDatabase.map(d => typeof d.id === "number" ? d.id : 0);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const newId = maxId + 1;

  const newDevice: DeviceModel = {
    ...device,
    id: newId,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  deviceDatabase.push(newDevice);
  return newDevice;
};

export const deleteDevice = async (id: string | number): Promise<boolean> => {
  const numericId = typeof id === "string" ? Number(id) : id;
  const index = deviceDatabase.findIndex(device => device.id === numericId);

  if (index !== -1) {
    deviceDatabase.splice(index, 1);
    return true;
  }

  return false;
};