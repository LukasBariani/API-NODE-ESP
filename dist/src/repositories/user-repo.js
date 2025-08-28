"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByID = exports.findAllUsers = void 0;
const userDatabase = [
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
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return userDatabase;
});
exports.findAllUsers = findAllUsers;
const findUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const numericId = typeof id === "string" ? Number(id) : id;
    return userDatabase.find(user => user.id === numericId);
});
exports.findUserByID = findUserByID;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Converte todos os ids para number, caso algum seja string (mais seguro)
    const ids = userDatabase.map(u => typeof u.id === "number" ? u.id : 0);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const newId = maxId + 1;
    const newUser = Object.assign(Object.assign({}, user), { id: newId, createdAt: new Date(), updatedAt: new Date() });
    userDatabase.push(newUser);
    return newUser;
});
exports.createUser = createUser;
