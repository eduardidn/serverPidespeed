import express, { Router } from 'express';

import Empresa_pedidoController from '../controllers/empresaPedidoController';

class Empresa_pedidoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', Empresa_pedidoController.list);
        this.router.get('/:id', Empresa_pedidoController.getOne);
        this.router.get('/byEmpresa/:id', Empresa_pedidoController.getByEmpresa);
        this.router.get('/byEmpresaByPedido/:eid/:pid', Empresa_pedidoController.getByEmpresaByPedido);
        this.router.get('/byPedido/:id', Empresa_pedidoController.getByPedido);
        this.router.get('/pendientes/:id', Empresa_pedidoController.getPendientes);
        this.router.get('/todos/pendientes', Empresa_pedidoController.getAllPendientes);
        this.router.get('/todos/terminados', Empresa_pedidoController.getAllTerminados);
        this.router.get('/terminados/:id', Empresa_pedidoController.getTerminados);
        this.router.get('/entregados/:id', Empresa_pedidoController.getEntregados);
        this.router.get('/get/byPago/:ids', Empresa_pedidoController.getByPago);
        this.router.post('/', Empresa_pedidoController.create);
        this.router.put('/:id', Empresa_pedidoController.update);
        this.router.delete('/:id', Empresa_pedidoController.delete);
    }

}

export default new Empresa_pedidoRoutes().router;

