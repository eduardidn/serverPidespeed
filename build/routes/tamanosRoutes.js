"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tamanosController_1 = __importDefault(require("../controllers/tamanosController"));
class TamanosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:ids/:tipo', tamanosController_1.default.list);
        this.router.get('/get/all', tamanosController_1.default.listAll);
        this.router.get('/get/byEmpresa/:id', tamanosController_1.default.listByEmpresa);
        this.router.get('/get/one/:id', tamanosController_1.default.getOne);
        this.router.put('/:id', tamanosController_1.default.update);
        this.router.post('/', tamanosController_1.default.create);
        this.router.delete('/:id', tamanosController_1.default.delete);
    }
}
class PublicTamanosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:ids/:tipo', tamanosController_1.default.list);
        this.router.get('/get/all', tamanosController_1.default.listAll);
        this.router.get('/get/byEmpresa/:id', tamanosController_1.default.listByEmpresa);
        this.router.get('/get/one/:id', tamanosController_1.default.getOne);
    }
}
exports.tamanosRoutes = new TamanosRoutes().router;
exports.publicTamanosRoutes = new PublicTamanosRoutes().router;
