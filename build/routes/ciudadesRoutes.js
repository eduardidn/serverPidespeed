"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ciudadesController_1 = __importDefault(require("../controllers/ciudadesController"));
class CiudadesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ciudadesController_1.default.list);
        this.router.get('/get/one/:id', ciudadesController_1.default.getOne);
        this.router.put('/:id', ciudadesController_1.default.update);
        this.router.post('/', ciudadesController_1.default.create);
        this.router.delete('/:id', ciudadesController_1.default.delete);
    }
}
class PublicCiudadesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ciudadesController_1.default.list);
        this.router.get('/get/one/:id', ciudadesController_1.default.getOne);
    }
}
exports.ciudadesRoutes = new CiudadesRoutes().router;
exports.publicCiudadesRoutes = new PublicCiudadesRoutes().router;
