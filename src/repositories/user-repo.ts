import { User } from "../models/user-model";

import { Device } from "../models/device-model";

export const findAllUsers = async () => {
  return await User.findAll();
};

export const findUserByID = async (id: number) => {
  return await User.findByPk(id);
};

export const createUser = async (data: any) => {
  return await User.create(data);
};

export const deleteUser = async (id: number) => {
  const deleted = await User.destroy({ where: { id } });
  return deleted > 0;
};
