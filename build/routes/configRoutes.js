"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configController_1 = __importDefault(require("../controllers/configController"));
class ConfigRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', configController_1.default.list);
        this.router.get('/get/one/:id', configController_1.default.getOne);
        this.router.put('/:id', configController_1.default.update);
        this.router.post('/', configController_1.default.create);
        this.router.delete('/:id', configController_1.default.delete);
    }
}
class PublicConfigRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', configController_1.default.list);
        this.router.get('/get/one/:id', configController_1.default.getOne);
    }
}
exports.configRoutes = new ConfigRoutes().router;
exports.publicConfigRoutes = new PublicConfigRoutes().router;
