import { Request, Response } from "express"

import * as service from "../services/user-service"
import { noContent, badRequest } from "../../utils/http-helper"

export const getUser = async (req: Request, res: Response) => {
    const httpResponse = await service.getUserService()
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const httpResponse = await service.deleteUserService(id)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const postUser = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const httpResponse = await service.createUserService(bodyValue)

    if (httpResponse) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }else{
        const response = await badRequest() 
        res.status(response.statusCode).json(response.body)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    console.log(id);
    const httpResponse = await service.getUserByIdService(id)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}