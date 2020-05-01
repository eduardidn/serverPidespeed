"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
class MailController {
    mailCambio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
            let text = req.body.text;
            let subject = req.body.subject;
            let codigo = req.body.codigo;
            /* let transporter = nodemailer.createTransport({
                host: 'smtp-relay.sendinblue.com',
                port: '587',
                auth: {
                    user: 'pidespeed@gmail.com',
                    pass: 'n90ChP4D5zkgbaNH'
                },
                logger: true,
                debug: false
            }); */
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '465',
                auth: {
                    user: 'Pidespeed@gmail.com',
                    pass: 'qphtkmofxbcvxkbl'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: 'PideSpeed <Pidespeed@gmail.com>',
                to: nombre + '<' + email + '>',
                subject: subject,
                //text: 'Hello to myself!',
                html: `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
                <div style="max-width: 600px;
                margin:  0 auto;">
                <div style="text-align: center; margin-top: 1.5rem;">
                    <img src="https://ssl.pidespeed.com/correos/logo.png" alt="Pidespeed Logo" style="height: 100%; width: 50%;">
                    <h1 style="color: #333;">Hola! ${nombre}</h1>
                    <p>${text}</p>
                </div>
                <div style="display: flex; justify-content: space-around; text-align: center; padding: 3rem 0; margin-top: 1rem;">
                    <img src="https://ssl.pidespeed.com/correos/confirmed.png" width="200px height:100%">
                    <div>
                        <p style=" font-size: 1.25rem; font-weight: 400;
                        color: #ff414d;">Tu código de confirmación es:</p>
                        <p style=" font-size: 1.75rem; font-weight: 700;
                        color: #ff414d;">${codigo}</p>
                    </div>
                  
                </div>
                <div style="background-color: rgb(247, 247, 247); padding: 1.5rem .5rem; ">
                    <h4 style="color: #333;">Equipo de Pidespeed</h4>
                    <hr>
                    <p>Si tienes alguna duda contáctanos a través de <a style="font-weight: 700;
                        color: #ff414d; text-decoration: none;" href="https://pidespeed.com/help">Ayuda en línea</a></p>
                    </div>
                </div>
            </body>`,
            };
            try {
                let info = yield transporter.sendMail(message);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    mailEstadoPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
            let codigo = req.body.codigo;
            let contenido = req.body.contenido;
            let transporter = nodemailer.createTransport({
                host: 'smtp-relay.sendinblue.com',
                port: '587',
                auth: {
                    user: 'pidespeed@gmail.com',
                    pass: 'n90ChP4D5zkgbaNH'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: 'PideSpeed <Pidespeed@gmail.com>',
                to: nombre + '<' + email + '>',
                subject: 'Actualización de su pedido',
                //text: 'Hello to myself!',
                html: `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
                <div style="max-width: 600px;
                margin:  0 auto;">
                <div style="text-align: center; margin-top: 1.5rem;">
                    <img src="https://ssl.pidespeed.com/correos/logo.png" alt="Pidespeed Logo" style="height: 100%; width: 50%;">
                </div>
                <div style="text-align: center; padding: 3rem 0; margin-top: 1rem;">
                    <img src="https://ssl.pidespeed.com/correos/confirmed.png" width="200px height:100%">
                    <div>
                        <p style="font-size: 1.5rem; font-weight: 400;
                        color: #ff414d;">El estado de tu pedido <span class="gridMovilText"
                        style="border-bottom:
                        2px solid #ff3e4c;
                        font-size: 1.75rem;
                        color:
                        #333;">${codigo}</span> es:</p>
                        <p style=" font-size: 2rem; font-weight: 700;
                        color: #ff414d;">${contenido}</p>
                    </div>
                </div>
                <div style="background-color: rgb(247, 247, 247); padding: 1.5rem .5rem; ">
                    <h4 style="color: #333;">Equipo de Pidespeed</h4>
                    <hr>
                    <p>Si tienes alguna duda contáctanos a través de <a style="font-weight: 700;
                        color: #ff414d; text-decoration: none;" href="https://pidespeed.com/help">Ayuda en línea</a></p>
                    </div>
                </div>
            </body>`,
            };
            try {
                let info = yield transporter.sendMail(message);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    mailPedidoListo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let nombreEmpresa = req.body.nombreEmpresa;
            let email = req.body.email;
            let codigo = req.body.codigo;
            let transporter = nodemailer.createTransport({
                host: 'smtp-relay.sendinblue.com',
                port: '587',
                auth: {
                    user: 'pidespeed@gmail.com',
                    pass: 'n90ChP4D5zkgbaNH'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: 'PideSpeed <Pidespeed@gmail.com>',
                to: nombre + '<' + email + '>',
                subject: 'Pedido Terminado',
                //text: 'Hello to myself!',
                html: `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
                <div style="max-width: 600px;
                margin:  0 auto;">
                <div style="text-align: center; margin-top: 1.5rem;">
                    <img src="https://ssl.pidespeed.com/correos/logo.png" alt="Pidespeed Logo" style="height: 100%; width: 50%;">
                </div>
                <div style="text-align: center; padding: 3rem 0; margin-top: 1rem;">
                    <img src="https://ssl.pidespeed.com/correos/confirmed.png" width="200px height:100%">
                    <div>
                        <p style="font-size: 1.5rem; font-weight: 400;"> Tu pedido <span class="gridMovilText"
                            style="border-bottom:
                            2px solid #ff3e4c;
                            font-size: 1.75rem;
                            color:
                            #333;">${codigo}</span> está listo en: </p>
                            <p style=" font-size: 2rem; font-weight: 700;
                            color: #ff414d;">${nombreEmpresa}</p>
                        </div>
                    </div>
                    <div style="background-color: rgb(247, 247, 247); padding: 1.5rem .5rem; ">
                        <h4 style="color: #333;">Equipo de Pidespeed</h4>
                        <hr>
                        <p>Si tienes alguna duda contáctanos a través de <a style="font-weight: 700;
                            color: #ff414d; text-decoration: none;" href="https://pidespeed.com/help">Ayuda en línea</a></p>
                        </div>
                    </div>
                </body>`,
            };
            try {
                let info = yield transporter.sendMail(message);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    mailNuevoPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
            let codigo = req.body.codigo;
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '465',
                auth: {
                    user: 'Pidespeed@gmail.com',
                    pass: 'qphtkmofxbcvxkbl'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: 'PideSpeed <Pidespeed@gmail.com>',
                to: nombre + '<' + email + '>',
                subject: 'Nuevo Pedido',
                //text: 'Hello to myself!',
                html: `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
                <div style="max-width: 600px;
                margin:  0 auto;">
                <div style="text-align: center; margin-top: 1.5rem;">
                    <img src="https://ssl.pidespeed.com/correos/logo.png" alt="Pidespeed Logo" style="height: 100%; width: 50%;">
                    <h1 style="color: #333;">${nombre}</h1>
                    <p>Tienes un nuevo pedido</p>
                </div>
                <div style="display: flex; justify-content: space-around; text-align: center; padding: 3rem 0; margin-top: 1rem;">
                    <img src="https://ssl.pidespeed.com/correos/confirmed.png" style="width: 12rem; height: 100%;">
                    <div>
                        <p style=" font-size: 1.25rem; font-weight: 400;
                        color: #ff414d;">El código de pedido es:</p>
                        <p style=" font-size: 1.75rem; font-weight: 700;
                        color: #ff414d;">${codigo}</p>
                    </div>
                </div>
                <div style="text-align:center">
                    <a style=" font-size: 1.5rem; font-weight: 700;
                    color: #fff; background: #ff414d; padding: .5rem 1rem; border-radius: 50rem; text-decoration: none;" href="https://empresas.pidespeed.com/orders">Ver pedidos</a>
                </div>
                <div style="background-color: rgb(247, 247, 247); padding: 1.5rem .5rem; margin-top: 2rem;">
                    <h4 style="color: #333;">Equipo de Pidespeed</h4>
                    <hr>
                    <p>Si tienes alguna duda contáctanos a través de <a style="font-weight: 700;
                        color: #ff414d; text-decoration: none;" href="https://pidespeed.com/help">Ayuda en línea</a></p>
                    </div>
                </div>
            </body>`,
            };
            try {
                let info = yield transporter.sendMail(message);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
}
const mailController = new MailController;
exports.default = mailController;
