"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adicionalesController_1 = __importDefault(require("../controllers/adicionalesController"));
class AdicionalesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', adicionalesController_1.default.list);
        this.router.get('/byIds/:ids/:tipo?', adicionalesController_1.default.listByIds);
        this.router.get('/get/one/:id', adicionalesController_1.default.getOne);
        this.router.put('/:id', adicionalesController_1.default.update);
        this.router.post('/', adicionalesController_1.default.create);
        this.router.delete('/:id', adicionalesController_1.default.delete);
    }
}
class PublicAdicionalesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', adicionalesController_1.default.list);
        this.router.get('/byIds/:ids/:tipo?', adicionalesController_1.default.listByIds);
        this.router.get('/get/one/:id', adicionalesController_1.default.getOne);
    }
}
exports.adicionalesRoutes = new AdicionalesRoutes().router;
exports.publicAdicionalesRoutes = new PublicAdicionalesRoutes().router;
