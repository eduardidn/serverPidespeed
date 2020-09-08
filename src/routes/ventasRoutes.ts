import express, { Router } from 'express';

import VentasController from '../controllers/ventasController';

class VentasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id', VentasController.list);
        this.router.get('/get/all', VentasController.listAll);
        this.router.get('/get/NoPagados/:id', VentasController.getNoPagados);
        this.router.get('/get/one/:id', VentasController.getOne);
        this.router.get('/getByPago/:ids', VentasController.getByPago);
        this.router.put('/:id', VentasController.update);
        this.router.post('/', VentasController.create);
        this.router.delete('/:id', VentasController.delete);
    }

}

export default new VentasRoutes().router;

