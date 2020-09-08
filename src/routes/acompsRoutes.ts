import express, { Router } from 'express';

import AcompsController from '../controllers/acompsController';

class AcompsRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', AcompsController.list);
        this.router.get('/:id', AcompsController.getOne);
        this.router.post('/', AcompsController.create);
        this.router.put('/:id', AcompsController.update);
        this.router.delete('/:id', AcompsController.delete);
    }

}

class PublicAcompsRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', AcompsController.list);
        this.router.get('/:id', AcompsController.getOne);
    }

}

export const acompsRoutes = new AcompsRoutes().router;
export const publicAcompsRoutes = new PublicAcompsRoutes().router;

