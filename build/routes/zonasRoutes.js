"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zonasController_1 = __importDefault(require("../controllers/zonasController"));
class ZonasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:ciudad', zonasController_1.default.list);
        this.router.get('/get/one/:id', zonasController_1.default.getOne);
        this.router.put('/:id', zonasController_1.default.update);
        this.router.post('/', zonasController_1.default.create);
        this.router.delete('/:id', zonasController_1.default.delete);
    }
}
class PublicZonasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:ciudad', zonasController_1.default.list);
        this.router.get('/get/one/:id', zonasController_1.default.getOne);
    }
}
exports.zonasRoutes = new ZonasRoutes().router;
exports.publicZonasRoutes = new PublicZonasRoutes().router;
