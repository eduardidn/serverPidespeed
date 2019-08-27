"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresasController_1 = __importDefault(require("../controllers/empresasController"));
var multipart = require('connect-multiparty');
var multipartMiddlewareLogo = multipart({ uploadDir: '../img/logos' });
var multipartMiddleware = multipart({ uploadDir: '../img/empresas' });
class EmpresasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', empresasController_1.default.listHome);
        this.router.get('/:ruta', empresasController_1.default.list);
        this.router.get('/addvisita/:ruta', empresasController_1.default.addVisita);
        this.router.get('/ventas/:ruta', empresasController_1.default.listVen);
        this.router.get('/populares/:ruta', empresasController_1.default.listPop);
        this.router.post('/image/:id', multipartMiddleware, empresasController_1.default.image);
        this.router.post('/imageLogo/:id', multipartMiddlewareLogo, empresasController_1.default.imageLogo);
        this.router.get('/one/:ruta', empresasController_1.default.getOne);
        this.router.post('/', empresasController_1.default.create);
        this.router.put('/:id', empresasController_1.default.update);
        this.router.delete('/:id', empresasController_1.default.delete);
    }
}
exports.default = new EmpresasRoutes().router;
