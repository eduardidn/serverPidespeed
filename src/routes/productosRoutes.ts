import express, { Router } from 'express';

import ProductosController from '../controllers/productosController';

class ProductosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:ruta/:tipo', ProductosController.list);
        this.router.get('/get/one/:id', ProductosController.getOne);
        this.router.get('/get/byDatos/:nombre/:descripcion', ProductosController.getOneByDatos);
        this.router.get('/restarCantidad/:id/:cantidad', ProductosController.restarCantidad);
        this.router.get('/get/categorias/:ruta/:tipo?', ProductosController.listCat);
        this.router.get('/get/categoriasEsp/:ruta/:tipo?', ProductosController.listCatEsp);
        this.router.get('/get/onecategoriaEsp/:id', ProductosController.listOneCatEsp);
        this.router.post('/image64/:id', ProductosController.image64);
        this.router.post('/', ProductosController.create);
        this.router.put('/:id', ProductosController.update);
        this.router.delete('/:id', ProductosController.delete);
    }

}

class PublicProductosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:ruta/:tipo', ProductosController.list);
        this.router.get('/get/one/:id', ProductosController.getOne);
        this.router.get('/get/byDatos/:nombre/:descripcion', ProductosController.getOneByDatos);
        this.router.get('/restarCantidad/:id/:cantidad', ProductosController.restarCantidad);
        this.router.get('/get/categorias/:ruta/:tipo?', ProductosController.listCat);
        this.router.get('/get/categoriasEsp/:ruta/:tipo?', ProductosController.listCatEsp);
        this.router.get('/get/onecategoriaEsp/:id', ProductosController.listOneCatEsp);
    }

}

export const productosRoutes = new ProductosRoutes().router;
export const publicProductosRoutes = new PublicProductosRoutes().router;

