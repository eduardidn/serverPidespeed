import express, { Router } from 'express';

import SaboresController from '../controllers/SaboresController';

class SaboresRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', SaboresController.list);
        this.router.get('/byIds/:ids/:tipo?', SaboresController.listByIds);
        this.router.get('/get/one/:id', SaboresController.getOne);
        this.router.put('/byIds/:ids', SaboresController.updateByIds);
        this.router.put('/:id', SaboresController.update);
        this.router.post('/', SaboresController.create);
        this.router.delete('/:id', SaboresController.delete);
    }

}

class PublicSaboresRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', SaboresController.list);
        this.router.get('/byIds/:ids/:tipo?', SaboresController.listByIds);
        this.router.get('/get/one/:id', SaboresController.getOne);
    }

}

export const saboresRoutes = new SaboresRoutes().router;
export const publicSaboresRoutes = new PublicSaboresRoutes().router;

