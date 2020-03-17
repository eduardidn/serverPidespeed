"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SaboresController_1 = __importDefault(require("../controllers/SaboresController"));
class SaboresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', SaboresController_1.default.list);
        this.router.get('/get/one/:id', SaboresController_1.default.getOne);
        this.router.put('/byIds/:id', SaboresController_1.default.updateByIds);
        this.router.put('/:id', SaboresController_1.default.update);
        this.router.post('/', SaboresController_1.default.create);
        this.router.delete('/:id', SaboresController_1.default.delete);
    }
}
exports.default = new SaboresRoutes().router;
