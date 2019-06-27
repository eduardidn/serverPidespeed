import express, { Router } from 'express';

import UsuariosController from '../controllers/usuariosController';

class UsuariosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', UsuariosController.list);
        this.router.get('/:id', UsuariosController.getOne);
        this.router.put('/:id', UsuariosController.update);
        this.router.delete('/:id', UsuariosController.delete);
    }

}

export default new UsuariosRoutes().router;

