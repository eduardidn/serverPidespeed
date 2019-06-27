import express, { Router } from 'express';

import ProductosController from '../controllers/productosController';

class ProductosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', ProductosController.list);
        this.router.get('/:id', ProductosController.getOne);
        this.router.post('/', ProductosController.create);
        this.router.put('/:id', ProductosController.update);
        this.router.delete('/:id', ProductosController.delete);
    }

}

export default new ProductosRoutes().router;

