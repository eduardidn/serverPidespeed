import express, { Router } from 'express';

import EstadosController from '../controllers/estadosController';

class EstadosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', EstadosController.list);
        this.router.get('/get/one/:id', EstadosController.getOne);
        this.router.put('/:id', EstadosController.update);
        this.router.post('/', EstadosController.create);
        this.router.delete('/:id', EstadosController.delete);
    }

}

class PublicEstadosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', EstadosController.list);
        this.router.get('/get/one/:id', EstadosController.getOne);
    }

}

export const estadosRoutes = new EstadosRoutes().router;
export const publicEstadosRoutes = new PublicEstadosRoutes().router;

