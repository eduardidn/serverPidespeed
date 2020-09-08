import express, { Router } from 'express';

import ZonasController from '../controllers/zonasController';

class ZonasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:ciudad', ZonasController.list);
        this.router.get('/get/one/:id', ZonasController.getOne);
        this.router.put('/:id', ZonasController.update);
        this.router.post('/', ZonasController.create);
        this.router.delete('/:id', ZonasController.delete);
    }

}

class PublicZonasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:ciudad', ZonasController.list);
        this.router.get('/get/one/:id', ZonasController.getOne);
        this.router.get('/get/ByIds/:ids', ZonasController.getByIds);
    }

}

export const zonasRoutes = new ZonasRoutes().router;
export const publicZonasRoutes = new PublicZonasRoutes().router;

