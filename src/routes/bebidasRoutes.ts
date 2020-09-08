import express, { Router } from 'express';

import BebidasController from '../controllers/bebidasController';

class BebidasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', BebidasController.list);
        this.router.get('/byIds/:ids/:tipo?', BebidasController.listByIds);
        this.router.get('/get/one/:id', BebidasController.getOne);
        this.router.put('/:id', BebidasController.update);
        this.router.post('/', BebidasController.create);
        this.router.delete('/:id', BebidasController.delete);
    }

}

class PublicBebidasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', BebidasController.list);
        this.router.get('/byIds/:ids/:tipo?', BebidasController.listByIds);
        this.router.get('/get/one/:id', BebidasController.getOne);
    }

}

export const bebidasRoutes = new BebidasRoutes().router;
export const publicBebidasRoutes = new PublicBebidasRoutes().router;

