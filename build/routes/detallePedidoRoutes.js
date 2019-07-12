"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallePedidoController_1 = __importDefault(require("../controllers/detallePedidoController"));
class Detalle_pedidoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', detallePedidoController_1.default.list);
        this.router.get('/:id', detallePedidoController_1.default.getOne);
        this.router.post('/', detallePedidoController_1.default.create);
        this.router.put('/:id', detallePedidoController_1.default.update);
        this.router.delete('/:id', detallePedidoController_1.default.delete);
    }
}
exports.default = new Detalle_pedidoRoutes().router;
