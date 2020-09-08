import express, { Router } from 'express';

import SubcategoriasController from '../controllers/subcategoriasController';

class SubcategoriasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', SubcategoriasController.list);
        this.router.get('/listEsp/:ruta/:tipo?', SubcategoriasController.listEsp);
        this.router.get('/listByEmpresa/:ruta', SubcategoriasController.listByEmpresa);
        this.router.get('/get/one/:id', SubcategoriasController.getOne);
        this.router.put('/:id', SubcategoriasController.update);
        this.router.post('/', SubcategoriasController.create);
        this.router.delete('/:id', SubcategoriasController.delete);
    }

}

class PublicSubcategoriasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', SubcategoriasController.list);
        this.router.get('/listEsp/:ruta/:tipo?', SubcategoriasController.listEsp);
        this.router.get('/listByEmpresa/:ruta', SubcategoriasController.listByEmpresa);
        this.router.get('/get/one/:id', SubcategoriasController.getOne);
    }

}

export const subcategoriasRoutes = new SubcategoriasRoutes().router;
export const publicSubcategoriasRoutes = new PublicSubcategoriasRoutes().router;

