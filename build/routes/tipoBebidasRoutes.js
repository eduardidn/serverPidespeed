"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoBebidasController_1 = __importDefault(require("../controllers/tipoBebidasController"));
class TipoBebidasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tipoBebidasController_1.default.list);
        this.router.get('/:id', tipoBebidasController_1.default.getOne);
        this.router.post('/', tipoBebidasController_1.default.create);
        this.router.put('/:id', tipoBebidasController_1.default.update);
        this.router.delete('/:id', tipoBebidasController_1.default.delete);
    }
}
class PublicTipoBebidasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tipoBebidasController_1.default.list);
        this.router.get('/:id', tipoBebidasController_1.default.getOne);
    }
}
exports.tipoBebidasRoutes = new TipoBebidasRoutes().router;
exports.publicTipoBebidasRoutes = new PublicTipoBebidasRoutes().router;
