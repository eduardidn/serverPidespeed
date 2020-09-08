import express, { Router } from 'express';

import CategoriasController from '../controllers/categoriasController';

class CategoriasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:tipo?', CategoriasController.list);
        this.router.get('/product/:tipo?', CategoriasController.listProduct);
        this.router.get('/one/:id', CategoriasController.getOne);
        this.router.post('/', CategoriasController.create);
        this.router.put('/:id', CategoriasController.update);
        this.router.delete('/:id', CategoriasController.delete);
        this.router.get('/product/:id', CategoriasController.getOneProduct);
        this.router.post('/product/', CategoriasController.createProduct);
        this.router.put('/product/:id', CategoriasController.updateProduct);
        this.router.delete('/product/:id', CategoriasController.deleteProduct);
    }

}

class PublicCategoriasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:tipo?', CategoriasController.list);
        this.router.get('/product/:tipo?', CategoriasController.listProduct);
        this.router.get('/one/:id', CategoriasController.getOne);
        this.router.get('/product/:id', CategoriasController.getOneProduct);
    }
}

export const categoriasRoutes = new CategoriasRoutes().router;
export const publicCategoriasRoutes = new PublicCategoriasRoutes().router;

