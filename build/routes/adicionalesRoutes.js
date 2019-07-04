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
        this.router.get('/:id', adicionalesController_1.default.list);
        this.router.get('/one/:id', adicionalesController_1.default.getOne);
        this.router.put('/', adicionalesController_1.default.update);
        this.router.post('/', adicionalesController_1.default.create);
        this.router.delete('/:id', adicionalesController_1.default.delete);
    }
}
exports.default = new AdicionalesRoutes().router;
