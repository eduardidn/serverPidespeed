import express, { Router } from 'express';

import PedidosController from '../controllers/pedidosController';

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './build/img/pedidos' });

class PedidosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', PedidosController.list);
        this.router.get('/porAprobar', PedidosController.listAprobar);
        this.router.get('/terminados', PedidosController.listTerminados);
        this.router.get('/cancelados', PedidosController.listCancelados);
        this.router.get('/byUsuarios/:id', PedidosController.listUsuario);
        this.router.get('/:id', PedidosController.getOne);
        this.router.get('/byDatos/:codigo/:precio', PedidosController.getOneByDatos);
        this.router.get('/get/byPago/:ids', PedidosController.getByPago);
        this.router.post('/', PedidosController.create);
        this.router.put('/:id', PedidosController.update);
        this.router.delete('/:id', PedidosController.delete);
    }

}

export default new PedidosRoutes().router;

