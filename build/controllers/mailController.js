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
    mailCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
            let codigo = req.body.codigo;
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '465',
                auth: {
                    user: 'eduardidn@gmail.com',
                    pass: 'vuqzqfrmtasyytla'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: nombre + '<' + email + '>',
                to: 'Eduardo <eduardidn@gmail.com>',
                subject: 'Este es su codigo de PideSpeed',
                //text: 'Hello to myself!',
                html: '<p>Se ha generado un codigo para realizar cambios en su cuenta</p>' +
                    'el codigo es el siguiente: <b>' + codigo + '</b>',
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
    mailVerificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
            let link = req.body.link;
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '465',
                auth: {
                    user: 'eduardidn@gmail.com',
                    pass: 'vuqzqfrmtasyytla'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: nombre + '<' + email + '>',
                to: 'Eduardo <eduardidn@gmail.com>',
                subject: 'verifique su cuenta de PideSpeed',
                //text: 'Hello to myself!',
                html: '<p>es necesario que verifique su cuenta para poder acceder al </p>' +
                    'el link para verificar es el siguiente: <b>' + link + '</b>',
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
