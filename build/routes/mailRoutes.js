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
        this.router.post('/bienvenido', mailController_1.default.mailBienvenido);
        this.router.post('/cambiarPass', mailController_1.default.mailCambiarPass);
        this.router.post('/estadoPedido', mailController_1.default.mailEstadoPedido);
        this.router.post('/nuevoPedido', mailController_1.default.mailNuevoPedido);
        this.router.post('/verificar', mailController_1.default.mailVerificacion);
    }
}
exports.default = new AcompsRoutes().router;
