"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/createUser', loginController_1.default.createUser);
        this.router.post('/buscarUserEmail', loginController_1.default.buscarUserEmail);
        this.router.post('/buscarUserEmail/completo', loginController_1.default.buscarUserByEmail);
        this.router.get('/buscarEmpresaEmail/:email', loginController_1.default.buscarEmpresaEmail);
        this.router.get('/email/:email', loginController_1.default.getOneByEmail);
        this.router.put('/recuperarPassword/:email', loginController_1.default.updatePassword);
        this.router.put('/recuperarPasswordAdmin/:email', loginController_1.default.updatePasswordEmpresaByEmail);
        this.router.put('/setPasswordEmpresa/:id', loginController_1.default.updatePasswordEmpresa);
        this.router.post('/bienvenido', loginController_1.default.mailBienvenido);
        this.router.post('/verificar', loginController_1.default.mailVerificacion);
        this.router.post('/recuperarPass', loginController_1.default.mailRecuperarPass);
        this.router.post('/promocion', loginController_1.default.mailPromocion);
        this.router.post('/buscarUserUsername', loginController_1.default.buscarUserUsername);
        this.router.post('/buscarEmpresaUsername', loginController_1.default.buscarEmpresaUsername);
        this.router.post('/buscarUserTelefono', loginController_1.default.buscarUserTelefono);
        this.router.post('/buscarUserCedula', loginController_1.default.buscarUserCedula);
        this.router.put('/usuario/:id', loginController_1.default.updateUsuario);
        this.router.post('/loginUser/', loginController_1.default.loginUser);
        this.router.post('/loginEmpresa', loginController_1.default.loginEmpresa);
        this.router.post('/loginAdmin', loginController_1.default.loginAdmin);
    }
}
exports.default = new LoginRoutes().router;
