import express, { Router } from 'express';

import TamanosController from '../controllers/tamanosController';

class TamanosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:ids/:tipo', TamanosController.list);
        this.router.get('/get/all', TamanosController.listAll);
        this.router.get('/get/byEmpresa/:id', TamanosController.listByEmpresa);
        this.router.get('/get/one/:id', TamanosController.getOne);
        this.router.put('/:id', TamanosController.update);
        this.router.post('/', TamanosController.create);
        this.router.delete('/:id', TamanosController.delete);
    }

}

class PublicTamanosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:ids/:tipo', TamanosController.list);
        this.router.get('/get/all', TamanosController.listAll);
        this.router.get('/get/byEmpresa/:id', TamanosController.listByEmpresa);
        this.router.get('/get/one/:id', TamanosController.getOne);
    }

}

export const tamanosRoutes = new TamanosRoutes().router;
export const publicTamanosRoutes = new PublicTamanosRoutes().router;

