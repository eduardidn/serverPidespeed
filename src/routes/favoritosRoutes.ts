import express, { Router } from 'express';

import FavoritosController from '../controllers/favoritosController';

class FavoritosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id', FavoritosController.list);
        this.router.post('/', FavoritosController.create);
        this.router.delete('/:id', FavoritosController.delete);
    }

}

export default new FavoritosRoutes().router;

