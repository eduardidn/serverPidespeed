import express, { Router } from 'express';

import FaqController from '../controllers/faqController';

class FaqRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.put('/:id', FaqController.update);
        this.router.post('/', FaqController.create);
        this.router.delete('/:id', FaqController.delete);
    }

}

class PublicFaqRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', FaqController.list);
        this.router.get('/get/one/:id', FaqController.getOne);
    }

}

export const faqRoutes = new FaqRoutes().router;
export const publicFaqRoutes = new PublicFaqRoutes().router;

