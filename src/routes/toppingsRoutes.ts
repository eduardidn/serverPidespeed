import express, { Router } from 'express';

import ToppingsController from '../controllers/toppingsController';

class ToppingsRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', ToppingsController.list);
        this.router.get('/byIds/:ids/:tipo?', ToppingsController .listByIds);
        this.router.get('/get/one/:id', ToppingsController.getOne);
        this.router.put('/:id', ToppingsController.update);
        this.router.post('/', ToppingsController.create);
        this.router.delete('/:id', ToppingsController.delete);
    }

}

class PublicToppingsRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', ToppingsController.list);
        this.router.get('/byIds/:ids/:tipo?', ToppingsController .listByIds);
        this.router.get('/get/one/:id', ToppingsController.getOne);
    }

}

export const toppingsRoutes = new ToppingsRoutes().router;
export const publicToppingsRoutes = new PublicToppingsRoutes().router;

