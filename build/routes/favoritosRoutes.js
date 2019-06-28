"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoritosController_1 = __importDefault(require("../controllers/favoritosController"));
class FavoritosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', favoritosController_1.default.list);
        this.router.post('/', favoritosController_1.default.create);
        this.router.delete('/:id', favoritosController_1.default.delete);
    }
}
exports.default = new FavoritosRoutes().router;
