import express, { Router } from 'express';

import LoginController from '../controllers/loginController';

class LoginRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/createUser', LoginController.createUser);
        this.router.post('/buscarUserEmail', LoginController.buscarUserEmail);
        this.router.post('/buscarUserEmail/completo', LoginController.buscarUserByEmail);
        this.router.get('/buscarEmpresaEmail/:email', LoginController.buscarEmpresaEmail);
        this.router.get('/email/:email', LoginController.getOneByEmail);
        this.router.put('/recuperarPassword/:email', LoginController.updatePassword);
        this.router.put('/recuperarPasswordAdmin/:email', LoginController.updatePasswordEmpresaByEmail);
        this.router.put('/setPasswordEmpresa/:id', LoginController.updatePasswordEmpresa);
        this.router.post('/bienvenido', LoginController.mailBienvenido);
        this.router.post('/verificar', LoginController.mailVerificacion);
        this.router.post('/recuperarPass', LoginController.mailRecuperarPass);
        this.router.post('/promocion', LoginController.mailPromocion);
        this.router.post('/buscarUserUsername', LoginController.buscarUserUsername);
        this.router.post('/buscarEmpresaUsername', LoginController.buscarEmpresaUsername);
        this.router.post('/buscarUserTelefono', LoginController.buscarUserTelefono);
        this.router.post('/buscarUserCedula', LoginController.buscarUserCedula);
        this.router.put('/usuario/:id', LoginController.updateUsuario);
        this.router.post('/loginUser/', LoginController.loginUser);
        this.router.post('/loginEmpresa', LoginController.loginEmpresa);
        this.router.post('/loginAdmin', LoginController.loginAdmin);
    }

}

export default new LoginRoutes().router;

