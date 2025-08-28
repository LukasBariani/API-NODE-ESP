"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app = (0, app_1.default)();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🐱‍🐉 server running at por http://localhost:${port}`);
});
