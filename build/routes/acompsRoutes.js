"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const acompsController_1 = __importDefault(require("../controllers/acompsController"));
class AcompsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', acompsController_1.default.list);
        this.router.get('/:id', acompsController_1.default.getOne);
        this.router.post('/', acompsController_1.default.create);
        this.router.put('/:id', acompsController_1.default.update);
        this.router.delete('/:id', acompsController_1.default.delete);
    }
}
exports.default = new AcompsRoutes().router;
