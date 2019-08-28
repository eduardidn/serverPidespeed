"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidosController_1 = __importDefault(require("../controllers/pedidosController"));
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './build/img/pedidos' });
class PedidosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', pedidosController_1.default.list);
        this.router.get('/:id', pedidosController_1.default.getOne);
        this.router.get('/get/byPago/:ids', pedidosController_1.default.getByPago);
        this.router.post('/', pedidosController_1.default.create);
        this.router.post('/image/:id', multipartMiddleware, pedidosController_1.default.image);
        this.router.put('/:id', pedidosController_1.default.update);
        this.router.delete('/:id', pedidosController_1.default.delete);
    }
}
exports.default = new PedidosRoutes().router;
