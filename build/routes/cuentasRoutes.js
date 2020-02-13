"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CuentasController_1 = __importDefault(require("../controllers/CuentasController"));
class CuentasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', CuentasController_1.default.list);
        this.router.get('/get/one/:id', CuentasController_1.default.getOne);
        this.router.put('/:id', CuentasController_1.default.update);
        this.router.post('/', CuentasController_1.default.create);
        this.router.delete('/:id', CuentasController_1.default.delete);
    }
}
exports.default = new CuentasRoutes().router;
