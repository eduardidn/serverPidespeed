"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasController_1 = __importDefault(require("../controllers/ventasController"));
class VentasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', ventasController_1.default.list);
        this.router.get('/get/all', ventasController_1.default.listAll);
        this.router.get('/get/NoPagados/:id', ventasController_1.default.getNoPagados);
        this.router.get('/get/one/:id', ventasController_1.default.getOne);
        this.router.put('/:id', ventasController_1.default.update);
        this.router.delete('/:id', ventasController_1.default.delete);
    }
}
exports.default = new VentasRoutes().router;
