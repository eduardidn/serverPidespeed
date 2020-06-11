"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filesController_1 = __importDefault(require("../controllers/filesController"));
class FilesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', filesController_1.default.list);
        this.router.get('/get/one/:id', filesController_1.default.getOne);
        this.router.put('/:id', filesController_1.default.update);
        this.router.post('/', filesController_1.default.create);
        this.router.delete('/:id', filesController_1.default.delete);
    }
}
exports.default = new FilesRoutes().router;
