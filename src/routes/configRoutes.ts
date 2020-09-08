import express, { Router } from 'express';

import ConfigController from '../controllers/configController';

class ConfigRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', ConfigController.list);
        this.router.get('/get/one/:id', ConfigController.getOne);
        this.router.put('/:id', ConfigController.update);
        this.router.post('/', ConfigController.create);
        this.router.delete('/:id', ConfigController.delete);
    }

}

class PublicConfigRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', ConfigController.list);
        this.router.get('/get/one/:id', ConfigController.getOne);
    }

}

export const configRoutes = new ConfigRoutes().router;
export const publicConfigRoutes = new PublicConfigRoutes().router;

