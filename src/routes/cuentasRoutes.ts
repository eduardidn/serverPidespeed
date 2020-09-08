import express, { Router } from 'express';

import CuentasController from '../controllers/CuentasController';

class CuentasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', CuentasController.list);
        this.router.get('/get/one/:id', CuentasController.getOne);
        this.router.put('/:id', CuentasController.update);
        this.router.post('/', CuentasController.create);
        this.router.delete('/:id', CuentasController.delete);
    }

}

class PublicCuentasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', CuentasController.list);
        this.router.get('/get/one/:id', CuentasController.getOne);
    }

}

export const cuentasRoutes = new CuentasRoutes().router;
export const publicCuentasRoutes = new PublicCuentasRoutes().router;

