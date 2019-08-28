"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagosController_1 = __importDefault(require("../controllers/pagosController"));
class PagosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', pagosController_1.default.list);
        this.router.get('/get/one/:id', pagosController_1.default.getOne);
        this.router.put('/:id', pagosController_1.default.update);
        this.router.post('/', pagosController_1.default.create);
        this.router.delete('/:id', pagosController_1.default.delete);
    }
}
exports.default = new PagosRoutes().router;
