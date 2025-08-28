import { Request, Response } from "express"

import * as service from "../services/device-service"
import { noContent, badRequest } from "../../utils/http-helper"

export const getDevice = async (req: Request, res: Response) => {
    const httpResponse = await service.getDeviceService()
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const postDevice = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const httpResponse = await service.createDeviceService(bodyValue)

    if (httpResponse) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }else{
        const response = await badRequest() 
        res.status(response.statusCode).json(response.body)
    }
}

export const getDeviceById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    //console.log(id);
    const httpResponse = await service.getDeviceByIdService(id)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}


export const deleteDevice = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const httpResponse = await service.deleteDeviceService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};


