"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bebidasController_1 = __importDefault(require("../controllers/bebidasController"));
class BebidasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', bebidasController_1.default.list);
        this.router.get('/get/one/:id', bebidasController_1.default.getOne);
        this.router.put('/:id', bebidasController_1.default.update);
        this.router.post('/', bebidasController_1.default.create);
        this.router.delete('/:id', bebidasController_1.default.delete);
    }
}
exports.default = new BebidasRoutes().router;
