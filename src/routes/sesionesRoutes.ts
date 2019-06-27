import express, { Router } from 'express';

import SesionesController from '../controllers/sesionesController';

class SesionesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/createUser', SesionesController.createUser);
        this.router.post('/security/createEmpresa', SesionesController.createEmpresa);
        this.router.post('/security/ubique/createAdmin', SesionesController.createAdmin);
        this.router.post('/loginUser/', SesionesController.loginUser);
        this.router.post('/loginEmpresa', SesionesController.loginEmpresa);
        this.router.post('/loginAdmin', SesionesController.loginAdmin);
    }

}

export default new SesionesRoutes().router;

