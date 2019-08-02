"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = __importDefault(require("../controllers/productosController"));
class ProductosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:ruta/:tipo', productosController_1.default.list);
        this.router.get('/one/:id', productosController_1.default.getOne);
        this.router.get('/categorias/:ruta', productosController_1.default.listCat);
        this.router.get('/categoriasEsp/:ruta', productosController_1.default.listCatEsp);
        this.router.get('/onecategoriaEsp/:id', productosController_1.default.listOneCatEsp);
        this.router.post('/', productosController_1.default.create);
        this.router.put('/:id', productosController_1.default.update);
        this.router.delete('/:id', productosController_1.default.delete);
    }
}
exports.default = new ProductosRoutes().router;
