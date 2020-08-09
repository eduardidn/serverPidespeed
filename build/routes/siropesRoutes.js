"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const siropesController_1 = __importDefault(require("../controllers/siropesController"));
class SiropesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', siropesController_1.default.list);
        this.router.get('/byIds/:ids/:tipo?', siropesController_1.default.listByIds);
        this.router.get('/get/one/:id', siropesController_1.default.getOne);
        this.router.put('/:id', siropesController_1.default.update);
        this.router.post('/', siropesController_1.default.create);
        this.router.delete('/:id', siropesController_1.default.delete);
    }
}
class PublicSiropesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:tipo', siropesController_1.default.list);
        this.router.get('/byIds/:ids/:tipo?', siropesController_1.default.listByIds);
        this.router.get('/get/one/:id', siropesController_1.default.getOne);
    }
}
exports.siropesRoutes = new SiropesRoutes().router;
exports.publicSiropesRoutes = new PublicSiropesRoutes().router;
