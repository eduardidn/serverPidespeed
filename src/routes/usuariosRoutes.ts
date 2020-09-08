import express, { Router } from 'express';

import UsuariosController from '../controllers/usuariosController';

class UsuariosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/list/all', UsuariosController.list);
        this.router.get('/:id', UsuariosController.getOne);
        this.router.post('/image64/:id',UsuariosController.image64);
        this.router.put('/:id', UsuariosController.update);
        this.router.put('/password/:id', UsuariosController.updatePassword);
        this.router.delete('/:id', UsuariosController.delete);
    }

}

class PublicUsuariosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/createUser', UsuariosController.createUser);
        this.router.post('/buscarUserEmail', UsuariosController.buscarUserEmail);
        this.router.post('/buscarUserEmail/completo', UsuariosController.buscarUserByEmail);
        this.router.get('/email/:email', UsuariosController.getOneByEmail);
        this.router.put('/recuperarPassword/:email', UsuariosController.updatePasswordByEmail);
        this.router.post('/buscarUserUsername', UsuariosController.buscarUserUsername);
        this.router.post('/buscarUserTelefono', UsuariosController.buscarUserTelefono);
        this.router.post('/buscarUserCedula', UsuariosController.buscarUserCedula);
        this.router.put('/usuario/:id', UsuariosController.update);
    }

}

export const usuariosRoutes = new UsuariosRoutes().router;
export const publicUsuariosRoutes = new PublicUsuariosRoutes().router;

