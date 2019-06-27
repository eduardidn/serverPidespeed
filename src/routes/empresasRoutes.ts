import express, { Router } from 'express';

import EmpresasController from '../controllers/empresasController';

class EmpresasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', EmpresasController.list);
        this.router.get('/:id', EmpresasController.getOne);
        this.router.post('/', EmpresasController.create);
        this.router.put('/:id', EmpresasController.update);
        this.router.delete('/:id', EmpresasController.delete);
    }

}

export default new EmpresasRoutes().router;

