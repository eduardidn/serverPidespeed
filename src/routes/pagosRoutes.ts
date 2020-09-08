import express, { Router } from 'express';

import PagosController from '../controllers/pagosController';

class PagosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id/:tipo', PagosController.list);
        this.router.get('/get/one/:id', PagosController.getOne);
        this.router.put('/:id', PagosController.update);
        this.router.post('/', PagosController.create);
        this.router.delete('/:id', PagosController.delete);
    }

}

export default new PagosRoutes().router;

