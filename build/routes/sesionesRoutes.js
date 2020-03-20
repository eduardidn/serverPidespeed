"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sesionesController_1 = __importDefault(require("../controllers/sesionesController"));
class SesionesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/createUser', sesionesController_1.default.createUser);
        this.router.post('/buscarUserEmail', sesionesController_1.default.buscarUserEmail);
        this.router.post('/buscarEmpresaEmail/:email', sesionesController_1.default.buscarEmpresaEmail);
        this.router.get('/email/:email', sesionesController_1.default.getOneByEmail);
        this.router.put('/recuperarPassword/:email', sesionesController_1.default.updatePassword);
        this.router.put('/recuperarPasswordAdmin/:email', sesionesController_1.default.updatePasswordAdmin);
        this.router.put('/setPasswordEmpresa/:id', sesionesController_1.default.updatePasswordEmpresa);
        this.router.post('/bienvenido', sesionesController_1.default.mailBienvenido);
        this.router.post('/verificar', sesionesController_1.default.mailVerificacion);
        this.router.post('/recuperarPass', sesionesController_1.default.mailRecuperarPass);
        this.router.post('/buscarUserUsername', sesionesController_1.default.buscarUserUsername);
        this.router.post('/buscarUserTelefono', sesionesController_1.default.buscarUserTelefono);
        this.router.post('/security/createEmpresa', sesionesController_1.default.createEmpresa);
        this.router.post('/security/ubique/createAdmin', sesionesController_1.default.createAdmin);
        this.router.post('/loginUser/', sesionesController_1.default.loginUser);
        this.router.post('/loginEmpresa', sesionesController_1.default.loginEmpresa);
        this.router.post('/loginAdmin', sesionesController_1.default.loginAdmin);
        this.router.put('/usuario/:id', sesionesController_1.default.updateUsuario);
    }
}
exports.default = new SesionesRoutes().router;
