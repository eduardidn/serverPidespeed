"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailController_1 = __importDefault(require("../controllers/mailController"));
class AcompsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/codigo', mailController_1.default.mailCodigo);
        this.router.post('/verificar', mailController_1.default.mailVerificacion);
    }
}
exports.default = new AcompsRoutes().router;
