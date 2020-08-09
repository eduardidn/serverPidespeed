"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = __importDefault(require("../controllers/usuariosController"));
class UsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/list/all', usuariosController_1.default.list);
        this.router.get('/:id', usuariosController_1.default.getOne);
        this.router.post('/image64/:id', usuariosController_1.default.image64);
        this.router.put('/:id', usuariosController_1.default.update);
        this.router.put('/password/:id', usuariosController_1.default.updatePassword);
        this.router.delete('/:id', usuariosController_1.default.delete);
    }
}
class PublicUsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/createUser', usuariosController_1.default.createUser);
        this.router.post('/buscarUserEmail', usuariosController_1.default.buscarUserEmail);
        this.router.post('/buscarUserEmail/completo', usuariosController_1.default.buscarUserByEmail);
        this.router.get('/email/:email', usuariosController_1.default.getOneByEmail);
        this.router.put('/recuperarPassword/:email', usuariosController_1.default.updatePasswordByEmail);
        this.router.post('/buscarUserUsername', usuariosController_1.default.buscarUserUsername);
        this.router.post('/buscarUserTelefono', usuariosController_1.default.buscarUserTelefono);
        this.router.post('/buscarUserCedula', usuariosController_1.default.buscarUserCedula);
        this.router.put('/usuario/:id', usuariosController_1.default.update);
    }
}
exports.usuariosRoutes = new UsuariosRoutes().router;
exports.publicUsuariosRoutes = new PublicUsuariosRoutes().router;
