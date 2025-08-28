import * as httpResponse from "../../utils/http-helper";
import * as deviceRepository from "../repositories/device-repo";
import { DeviceModel } from "../models/device-model";

export const getDeviceService = async () => {
    const data = await deviceRepository.findAllDevices();

    let response = null;

    if (data) {
      response = await httpResponse.ok(data)
    }else{
        response = await httpResponse.noContent()
    }
    return response
}

export const createDeviceService = async (device: DeviceModel | undefined) => {
  if (!device || Object.keys(device).length === 0) {
    return await httpResponse.badRequest();
  } else {
      const createdDevice = await deviceRepository.createDevice(device);
      console.log(createdDevice)
  return await httpResponse.DeviceCreated(createdDevice);
  }
}

export const getDeviceByIdService = async (id:number) => {
    const data = await deviceRepository.findDeviceByID(id);

    let response = null;

    if (data) {
      response = await httpResponse.ok(data)
    }else{
        response = await httpResponse.noContent()
    }
    return response
}

export const deleteDeviceService = async (id: number) => {
  const deleted = await deviceRepository.deleteDevice(id);

  if (deleted) {
    return await httpResponse.ok({ message: "Device deletado com sucesso" });
  } else {
    return await httpResponse.notFound(); 
  }
};
