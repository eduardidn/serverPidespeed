"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadosController_1 = __importDefault(require("../controllers/estadosController"));
class EstadosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', estadosController_1.default.list);
        this.router.get('/get/one/:id', estadosController_1.default.getOne);
        this.router.put('/:id', estadosController_1.default.update);
        this.router.post('/', estadosController_1.default.create);
        this.router.delete('/:id', estadosController_1.default.delete);
    }
}
exports.default = new EstadosRoutes().router;
