"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategoriasController_1 = __importDefault(require("../controllers/subcategoriasController"));
class SubcategoriasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', subcategoriasController_1.default.list);
        this.router.get('/listEsp/:ruta/:tipo?', subcategoriasController_1.default.listEsp);
        this.router.get('/listByEmpresa/:ruta/', subcategoriasController_1.default.listByEmpresa);
        this.router.get('/get/one/:id', subcategoriasController_1.default.getOne);
        this.router.put('/:id', subcategoriasController_1.default.update);
        this.router.post('/', subcategoriasController_1.default.create);
        this.router.delete('/:id', subcategoriasController_1.default.delete);
    }
}
exports.default = new SubcategoriasRoutes().router;
