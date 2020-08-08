"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriasProductController_1 = __importDefault(require("../controllers/categoriasProductController"));
class CategoriasProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoriasProductController_1.default.list);
        this.router.get('/get/one/:id', categoriasProductController_1.default.getOne);
        this.router.put('/:id', categoriasProductController_1.default.update);
        this.router.post('/', categoriasProductController_1.default.create);
        this.router.delete('/:id', categoriasProductController_1.default.delete);
    }
}
class PublicCategoriasProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoriasProductController_1.default.list);
        this.router.get('/get/one/:id', categoriasProductController_1.default.getOne);
    }
}
exports.categoriasProductRoutes = new CategoriasProductRoutes().router;
exports.publicCategoriasProductRoutes = new PublicCategoriasProductRoutes().router;
