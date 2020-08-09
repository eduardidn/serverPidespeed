"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailController_1 = __importDefault(require("../controllers/mailController"));
class MailRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/cambio', mailController_1.default.mailCambio);
        this.router.post('/estadoPedido', mailController_1.default.mailEstadoPedido);
        this.router.post('/pedidoTerminado', mailController_1.default.mailPedidoListo);
        this.router.post('/nuevoPedido', mailController_1.default.mailNuevoPedido);
    }
}
class PublicMailRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/bienvenido', mailController_1.default.mailBienvenido);
        this.router.post('/verificar', mailController_1.default.mailVerificacion);
        this.router.post('/recuperarPass', mailController_1.default.mailRecuperarPass);
        this.router.post('/promocion', mailController_1.default.mailPromocion);
    }
}
exports.mailRoutes = new MailRoutes().router;
exports.publicMailRoutes = new PublicMailRoutes().router;
