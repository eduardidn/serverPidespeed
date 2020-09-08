import express, { Router } from 'express';

import TipoBebidasController from '../controllers/tipoBebidasController';

class TipoBebidasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', TipoBebidasController.list);
        this.router.get('/:id', TipoBebidasController.getOne);
        this.router.post('/', TipoBebidasController.create);
        this.router.put('/:id', TipoBebidasController.update);
        this.router.delete('/:id', TipoBebidasController.delete);
    }

}

class PublicTipoBebidasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', TipoBebidasController.list);
        this.router.get('/:id', TipoBebidasController.getOne);
    }

}

export const tipoBebidasRoutes = new TipoBebidasRoutes().router;
export const publicTipoBebidasRoutes = new PublicTipoBebidasRoutes().router;

 