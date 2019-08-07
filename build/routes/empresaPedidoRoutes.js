"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresaPedidoController_1 = __importDefault(require("../controllers/empresaPedidoController"));
class Empresa_pedidoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', empresaPedidoController_1.default.list);
        this.router.get('/:id', empresaPedidoController_1.default.getOne);
        this.router.get('/pendientes/:id', empresaPedidoController_1.default.getPendientes);
        this.router.get('/terminados/:id', empresaPedidoController_1.default.getTerminados);
        this.router.get('/entregados/:id', empresaPedidoController_1.default.getEntregados);
        this.router.post('/', empresaPedidoController_1.default.create);
        this.router.put('/:id', empresaPedidoController_1.default.update);
        this.router.delete('/:id', empresaPedidoController_1.default.delete);
    }
}
exports.default = new Empresa_pedidoRoutes().router;
