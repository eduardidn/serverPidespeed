"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const toppingsController_1 = __importDefault(require("../controllers/toppingsController"));
class ToppingsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', toppingsController_1.default.list);
        this.router.get('/one/:id', toppingsController_1.default.getOne);
        this.router.put('/', toppingsController_1.default.update);
        this.router.post('/', toppingsController_1.default.create);
        this.router.delete('/:id', toppingsController_1.default.delete);
    }
}
exports.default = new ToppingsRoutes().router;
