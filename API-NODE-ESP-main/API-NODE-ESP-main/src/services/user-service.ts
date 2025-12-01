import * as httpResponse from "../../utils/http-helper";
import * as UserRepository from "../repositories/user-repo";
import { User } from "../models/user-model";

export const getUserService = async () => {
    const data = await UserRepository.findAllUsers();

    let response = null;

    if (data) {
      response = await httpResponse.ok(data)
    }else{
        response = await httpResponse.noContent()
    }
    return response
}

export const createUserService = async (user: User | undefined) => {
  if (!user || Object.keys(user).length === 0) {
    return await httpResponse.badRequest();
  } else {
      const createdUser = await UserRepository.createUser(user);
      console.log(createdUser)
  return await httpResponse.created(createdUser);
  }
}

export const getUserByIdService = async (id:number) => {
    const data = await UserRepository.findUserByID(id);

    let response = null;

    if (data) {
      response = await httpResponse.ok(data)
    }else{
        response = await httpResponse.noContent()
    }
    return response
}

export const deleteUserService = async (userId: number | undefined) => {
  if (!userId) {
    return await httpResponse.badRequest();
  }

  const userExists = await UserRepository.findUserByID(userId);
  if (!userExists) {
    return await httpResponse.notFound();
  }

  await UserRepository.deleteUser(userId);
  return await httpResponse.noContent();
}