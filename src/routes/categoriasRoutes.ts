import express, { Router } from 'express';

import CategoriasController from '../controllers/categoriasController';

class CategoriasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', CategoriasController.list);
        this.router.get('/:id', CategoriasController.getOne);
        this.router.post('/', CategoriasController.create);
        this.router.put('/:id', CategoriasController.update);
        this.router.delete('/:id', CategoriasController.delete);
    }

}

export default new CategoriasRoutes().router;

