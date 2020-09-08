import express, { Router } from 'express';

import SiropesController from '../controllers/siropesController';

class SiropesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', SiropesController.list);
        this.router.get('/byIds/:ids/:tipo?', SiropesController.listByIds);
        this.router.get('/get/one/:id', SiropesController.getOne);
        this.router.put('/:id', SiropesController.update);
        this.router.post('/', SiropesController.create);
        this.router.delete('/:id', SiropesController.delete);
    }

}

class PublicSiropesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', SiropesController.list);
        this.router.get('/byIds/:ids/:tipo?', SiropesController.listByIds);
        this.router.get('/get/one/:id', SiropesController.getOne);
    }

}

export const siropesRoutes = new SiropesRoutes().router;
export const publicSiropesRoutes = new PublicSiropesRoutes().router;

