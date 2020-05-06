"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CiudadesController_1 = __importDefault(require("../controllers/CiudadesController"));
class CiudadesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', CiudadesController_1.default.list);
        this.router.get('/get/one/:id', CiudadesController_1.default.getOne);
        this.router.put('/:id', CiudadesController_1.default.update);
        this.router.post('/', CiudadesController_1.default.create);
        this.router.delete('/:id', CiudadesController_1.default.delete);
    }
}
exports.default = new CiudadesRoutes().router;
