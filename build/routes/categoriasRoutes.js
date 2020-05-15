"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriasController_1 = __importDefault(require("../controllers/categoriasController"));
class CategoriasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:tipo?', categoriasController_1.default.list);
        this.router.get('/product/:tipo?', categoriasController_1.default.listProduct);
        this.router.get('/one/:id', categoriasController_1.default.getOne);
        this.router.post('/', categoriasController_1.default.create);
        this.router.put('/:id', categoriasController_1.default.update);
        this.router.delete('/:id', categoriasController_1.default.delete);
        this.router.get('/product/:id', categoriasController_1.default.getOneProduct);
        this.router.post('/product/', categoriasController_1.default.createProduct);
        this.router.put('/product/:id', categoriasController_1.default.updateProduct);
        this.router.delete('/product/:id', categoriasController_1.default.deleteProduct);
    }
}
exports.default = new CategoriasRoutes().router;
