"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresasController_1 = __importDefault(require("../controllers/empresasController"));
class EmpresasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:type?', empresasController_1.default.listHome);
        this.router.get('/categoria/:ruta', empresasController_1.default.list);
        this.router.get('/get/all/:id', empresasController_1.default.listAll);
        this.router.get('/addvisita/:ruta', empresasController_1.default.addVisita);
        this.router.get('/addventa/:ruta', empresasController_1.default.addVenta);
        this.router.get('/ventas/:ruta', empresasController_1.default.listVen);
        this.router.get('/populares/:ruta', empresasController_1.default.listPop);
        this.router.post('/image64/:id', empresasController_1.default.image64);
        this.router.post('/logo64/:id', empresasController_1.default.logo64);
        this.router.get('/sucursales/:id', empresasController_1.default.getSucursales);
        this.router.get('/one/:ruta', empresasController_1.default.getOne);
        this.router.get('/one/byId/:id', empresasController_1.default.getOneById);
        this.router.post('/', empresasController_1.default.create);
        this.router.put('/:id', empresasController_1.default.update);
        this.router.delete('/:id', empresasController_1.default.delete);
    }
}
exports.default = new EmpresasRoutes().router;
