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
        this.router.get('/porAprobar', pedidosController_1.default.listAprobar);
        this.router.get('/terminados', pedidosController_1.default.listTerminados);
        this.router.get('/cancelados', pedidosController_1.default.listCancelados);
        this.router.get('/byUsuarios/:id', pedidosController_1.default.listUsuario);
        this.router.get('/:id', pedidosController_1.default.getOne);
        this.router.get('/byDatos/:codigo/:precio', pedidosController_1.default.getOneByDatos);
        this.router.get('/get/byPago/:ids', pedidosController_1.default.getByPago);
        this.router.post('/', pedidosController_1.default.create);
        this.router.post('/image64/:id', pedidosController_1.default.image64);
        this.router.put('/:id', pedidosController_1.default.update);
        this.router.delete('/:id', pedidosController_1.default.delete);
    }
}
exports.default = new PedidosRoutes().router;
