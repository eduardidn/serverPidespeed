import express, { Router } from 'express';

import CiudadesController from '../controllers/ciudadesController';

class CiudadesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', CiudadesController.list);
        this.router.get('/get/one/:id', CiudadesController.getOne);
        this.router.put('/:id', CiudadesController.update);
        this.router.post('/', CiudadesController.create);
        this.router.delete('/:id', CiudadesController.delete);
    }

}

class PublicCiudadesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', CiudadesController.list);
        this.router.get('/get/one/:id', CiudadesController.getOne);
    }

}

export const ciudadesRoutes = new CiudadesRoutes().router;
export const publicCiudadesRoutes = new PublicCiudadesRoutes().router;

