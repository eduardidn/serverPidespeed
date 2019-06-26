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
        this.router.get('/', empresasController_1.default.list);
        this.router.get('/:id', empresasController_1.default.getOne);
        this.router.post('/', empresasController_1.default.create);
        this.router.put('/:id', empresasController_1.default.update);
        this.router.delete('/:id', empresasController_1.default.delete);
    }
}
exports.default = new EmpresasRoutes().router;
