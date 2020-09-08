import express, { Router } from 'express';

import AdicionalesController from '../controllers/adicionalesController';

class AdicionalesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', AdicionalesController.list);
        this.router.get('/byIds/:ids/:tipo?', AdicionalesController.listByIds);
        this.router.get('/get/one/:id', AdicionalesController.getOne);
        this.router.put('/:id', AdicionalesController.update);
        this.router.post('/', AdicionalesController.create);
        this.router.delete('/:id', AdicionalesController.delete);
    }

}

class PublicAdicionalesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', AdicionalesController.list);
        this.router.get('/byIds/:ids/:tipo?', AdicionalesController.listByIds);
        this.router.get('/get/one/:id', AdicionalesController.getOne);
    }

}

export const adicionalesRoutes = new AdicionalesRoutes().router;
export const publicAdicionalesRoutes = new PublicAdicionalesRoutes().router;

