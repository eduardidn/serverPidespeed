import express, { Router } from 'express';

import Detalle_pedidoController from '../controllers/detallePedidoController';

class Detalle_pedidoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', Detalle_pedidoController.list);
        this.router.get('/:pid/:eid', Detalle_pedidoController.getPedidos);
        this.router.get('/get/byPedido/:pid', Detalle_pedidoController.getPedidosByPedido);
        this.router.get('/:id', Detalle_pedidoController.getOne);
        this.router.post('/', Detalle_pedidoController.create);
        this.router.put('/:id', Detalle_pedidoController.update);
        this.router.delete('/:id', Detalle_pedidoController.delete);
    }

}

export default new Detalle_pedidoRoutes().router;

