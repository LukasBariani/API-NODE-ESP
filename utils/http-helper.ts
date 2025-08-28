import { httpResponse } from "../src/models/http-response-model";
import { UserModel } from "../src/models/user-model";
import { DeviceModel } from "../src/models/device-model";

// Success: 200 OK
export const ok = async (data: any): Promise<httpResponse> => {
    return {
        statusCode: 200,
        body: data,
    };
};

// Success: 204 No Content
export const noContent = async (): Promise<httpResponse> => {
    return {
        statusCode: 204,
        body: null,
    };
};

// Success: 201 User Create
export const created = async (body: any): Promise<httpResponse> => {
    return {
        statusCode: 201,
        body: null,
    };
};

// Success: 201 Device Create
export const DeviceCreated = async (createdDevice: DeviceModel ): Promise<httpResponse> => {
    return {
        statusCode: 201,
        body: null,
    };
};

// Client Error: 400 Bad Request
export const badRequest = async (): Promise<httpResponse> => {
    return {
        statusCode: 400,
        body:null,
    };
};

// Client Error: 401 Unauthorized
export const unauthorized = async (message: string = "Unauthorized"): Promise<httpResponse> => {
    return {
        statusCode: 401,
        body: { error: message },
    };
};

// Client Error: 403 Forbidden
export const forbidden = async (message: string = "Forbidden"): Promise<httpResponse> => {
    return {
        statusCode: 403,
        body: { error: message },
    };
};

// Client Error: 404 Not Found
export const notFound = async (message: string = "Not Found"): Promise<httpResponse> => {
    return {
        statusCode: 404,
        body: { error: message },
    };
};

// Server Error: 500 Internal Server Error
export const serverError = async (error: Error): Promise<httpResponse> => {
    return {
        statusCode: 500,
        body: { error: error.message || "Internal Server Error" },
    };
};
