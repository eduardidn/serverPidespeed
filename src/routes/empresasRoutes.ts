import express, { Router } from 'express';

import EmpresasController from '../controllers/empresasController';

class EmpresasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:type?', EmpresasController.listHome);
        this.router.get('/categoria/:ruta/:ciudad?', EmpresasController.list);
        this.router.get('/get/all/:id/:ciudad?', EmpresasController.listAll);
        this.router.get('/addvisita/:ruta', EmpresasController.addVisita);
        this.router.get('/addventa/:ruta', EmpresasController.addVenta);
        this.router.get('/ventas/:ruta/:ciudad?', EmpresasController.listVen);
        this.router.get('/populares/:ruta/:ciudad?', EmpresasController.listPop);
        this.router.post('/image64/:id',EmpresasController.image64);
        this.router.post('/logo64/:id',EmpresasController.logo64);
        this.router.get('/sucursales/:id', EmpresasController.getSucursales);
        this.router.get('/one/:ruta', EmpresasController.getOne);
        this.router.get('/one/byId/:id', EmpresasController.getOneById);
        this.router.post('/', EmpresasController.create);
        this.router.put('/:id', EmpresasController.update);
        this.router.delete('/:id', EmpresasController.delete);
    }

}

class PublicEmpresasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:type?', EmpresasController.listHome);
        this.router.get('/categoria/:ruta/:ciudad?', EmpresasController.list);
        this.router.get('/get/all/:id/:ciudad?', EmpresasController.listAll);
        this.router.get('/addvisita/:ruta', EmpresasController.addVisita);
        this.router.get('/addventa/:ruta', EmpresasController.addVenta);
        this.router.get('/ventas/:ruta/:ciudad?', EmpresasController.listVen);
        this.router.get('/populares/:ruta/:ciudad?', EmpresasController.listPop);
        this.router.get('/sucursales/:id', EmpresasController.getSucursales);
        this.router.get('/one/:ruta', EmpresasController.getOne);
        this.router.get('/one/byId/:id', EmpresasController.getOneById);
        this.router.get('/get/byTasa/:tasa', EmpresasController.getByTasas);
        this.router.get('/buscarEmpresaEmail/:email', EmpresasController.buscarEmpresaEmail);
        this.router.put('/recuperarPasswordAdmin/:email', EmpresasController.updatePasswordEmpresaByEmail);
        this.router.put('/setPasswordEmpresa/:id', EmpresasController.updatePasswordEmpresa);
        this.router.post('/buscarEmpresaUsername', EmpresasController.buscarEmpresaUsername);
    }

}

export const empresasRoutes = new EmpresasRoutes().router;
export const publicEmpresasRoutes = new PublicEmpresasRoutes().router;