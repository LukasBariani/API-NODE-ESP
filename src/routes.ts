import { Router } from "express";
import * as userController from "./controllers/user-controller";
import * as deviceController from "./controllers/device-controller";
import * as readingController from "./controllers/reading-controller";

//import * as DeviceController from "./controllers/device-controller";

const router = Router()

 // rotas users
router.get("/users", userController.getUser)

router.get("/users/:id", userController.getUserById)

router.post("/users", userController.postUser)

router.delete("/users/:id", userController.deleteUser)

// rotas devices
router.get("/devices", deviceController.getDevice)

router.get("/devices/:id", deviceController.getDeviceById)

router.post("/devices", deviceController.postDevice)

router.delete("/devices/:id", deviceController.deleteDevice)

// rotas readings
router.get("/readings", readingController.getReadings);
router.get("/readings/device/:deviceId", readingController.getReadingsByDeviceId);
router.get("/readings/device/:deviceId/last", readingController.getLastReadingByDeviceId);
router.get("/readings/device/:deviceId/period", readingController.getReadingsByPeriod);


router.post("/readings", readingController.postReading);

// Rota especial para o ESP32 (usando API Key no header)
router.post("/esp/reading", readingController.postReading);



export default router;