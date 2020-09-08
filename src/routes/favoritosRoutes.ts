import express, { Router } from 'express';

import FavoritosController from '../controllers/favoritosController';

class FavoritosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id', FavoritosController.list);
        this.router.get('/getOne/:Uid/:Eid', FavoritosController.getOne);
        this.router.get('/:id/:ruta', FavoritosController.listEsp);
        this.router.post('/', FavoritosController.create);
        this.router.delete('/:id', FavoritosController.delete);
    }

}

export default new FavoritosRoutes().router;

