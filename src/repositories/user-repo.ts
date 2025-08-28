import { UserModel } from "../models/user-model";

const userDatabase: UserModel[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    passwordHash: "$2b$10$EwRk2jYp1KxH9ZhJ1KQ2tuFhJzRuj3w8uHfnlK8VdF0S/FVZp8Hqu",
    createdAt: new Date("2023-01-15T10:00:00Z"),
    updatedAt: new Date("2023-01-15T10:00:00Z")
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria.souza@example.com",
    passwordHash: "$2b$10$9NYPDQ0S8KPcmZIEH7zOwOB5Ilh93y6kzXQX3rhX6J1TP0bcfrfqy",
    createdAt: new Date("2023-02-20T15:30:00Z"),
    updatedAt: new Date("2023-03-01T08:45:00Z")
  },
  {
    id: 3,
    name: "Carlos Lima",
    email: "carlos.lima@example.com",
    passwordHash: "$2b$10$ZzQkVmewRjYZuKHqK7mPMupQgR9D4u9EvLaYbM1WBz7Y3Z8KdQ0Mq",
    createdAt: new Date("2023-05-05T11:20:00Z"),
    updatedAt: new Date("2023-05-06T12:00:00Z")
  }
];

export const findAllUsers = async (): Promise<UserModel[]> => {
  return userDatabase;
};

export const findUserByID = async (id: string | number): Promise<UserModel | undefined> => {
  const numericId = typeof id === "string" ? Number(id) : id;
  return userDatabase.find(user => user.id === numericId);
};

export const createUser = async (user: UserModel): Promise<UserModel> => {
  // Converte todos os ids para number, caso algum seja string (mais seguro)
  const ids = userDatabase.map(u => typeof u.id === "number" ? u.id : 0);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const newId = maxId + 1;

  const newUser: UserModel = {
    ...user,
    id: newId,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  userDatabase.push(newUser);
  return newUser;
};
