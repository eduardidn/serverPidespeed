import express, { Router } from 'express';

import CategoriasProductController from '../controllers/categoriasProductController';

class CategoriasProductRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', CategoriasProductController.list);
        this.router.get('/get/one/:id', CategoriasProductController.getOne);
        this.router.put('/:id', CategoriasProductController.update);
        this.router.post('/', CategoriasProductController.create);
        this.router.delete('/:id', CategoriasProductController.delete);
    }

}

class PublicCategoriasProductRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', CategoriasProductController.list);
        this.router.get('/get/one/:id', CategoriasProductController.getOne);
    }

}

export const categoriasProductRoutes = new CategoriasProductRoutes().router;
export const publicCategoriasProductRoutes = new PublicCategoriasProductRoutes().router;

