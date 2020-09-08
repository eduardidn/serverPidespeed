import express, { Router } from 'express';

import MailController from '../controllers/mailController';

class MailRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/cambio', MailController.mailCambio);
        this.router.post('/estadoPedido', MailController.mailEstadoPedido);
        this.router.post('/pedidoTerminado', MailController.mailPedidoListo);
        this.router.post('/nuevoPedido', MailController.mailNuevoPedido);
    }

}

class PublicMailRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/bienvenido', MailController.mailBienvenido);
        this.router.post('/verificar', MailController.mailVerificacion);
        this.router.post('/recuperarPass', MailController.mailRecuperarPass);
        this.router.post('/promocion', MailController.mailPromocion);
    }

}

export const mailRoutes = new MailRoutes().router;
export const publicMailRoutes = new PublicMailRoutes().router;

