import { Router } from "express";
import * as userController from "./controllers/user-controller";
import * as deviceController from "./controllers/device-controller";
import * as readingController from "./controllers/reading-controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operações com usuários
 *   - name: Devices
 *     description: Operações com dispositivos
 *   - name: Readings
 *     description: Operações com leituras de sensores
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/users", userController.getUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 */
router.get("/users/:id", userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, passwordHash]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               passwordHash:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/users", userController.postUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *       - passwordHash: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário removido
 */
router.delete("/users/:id", userController.deleteUser);

// ==== Devices ====

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Lista todos os dispositivos
 *     tags: [Devices]
 */
router.get("/devices", deviceController.getDevice);

/**
 * @swagger
 * /devices/{id}:
 *   get:
 *     summary: Busca um dispositivo por ID
 *     tags: [Devices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/devices/:id", deviceController.getDeviceById);

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Cadastra um novo dispositivo
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, apiKey]
 *             properties:
 *               name:
 *                 type: string
 *               apiKey:
 *                 type: string
 */
router.post("/devices", deviceController.postDevice);

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Remove um dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/devices/:id", deviceController.deleteDevice);

// ==== Readings ====

/**
 * @swagger
 * /readings:
 *   get:
 *     summary: Lista todas as leituras
 *     tags: [Readings]
 */
router.get("/readings", readingController.getReadings);

/**
 * @swagger
 * /readings/device/{deviceId}:
 *   get:
 *     summary: Lista todas as leituras de um dispositivo
 *     tags: [Readings]
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/readings/device/:deviceId", readingController.getReadingsByDeviceId);

/**
 * @swagger
 * /readings/device/{deviceId}/last:
 *   get:
 *     summary: Retorna a última leitura de um dispositivo
 *     tags: [Readings]
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/readings/device/:deviceId/last", readingController.getLastReadingByDeviceId);

/**
 * @swagger
 * /readings/device/{deviceId}/period:
 *   get:
 *     summary: Lista leituras de um dispositivo por período
 *     tags: [Readings]
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: start
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: end
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 */
router.get("/readings/device/:deviceId/period", readingController.getReadingsByPeriod);

/**
 * @swagger
 * /readings:
 *   post:
 *     summary: Adiciona uma nova leitura
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [deviceId, temperature, humidity, luminosity, gas]
 *             properties:
 *               deviceId:
 *                 type: integer
 *               temperature:
 *                 type: number
 *               humidity:
 *                 type: number
 *               luminosity:
 *                 type: number
 *               gas:
 *                 type: number
 */
router.post("/readings", readingController.postReading);

/**
 * @swagger
 * /esp/reading:
 *   post:
 *     summary: Rota especial para o ESP32 enviar leitura com apiKey
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [temperature, humidity, luminosity, gas]
 *             properties:
 *               temperature:
 *                 type: number
 *               humidity:
 *                 type: number
 *               luminosity:
 *                 type: number
 *               gas:
 *                 type: number
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 */
router.post("/esp/reading", readingController.postReading);

export default router;
