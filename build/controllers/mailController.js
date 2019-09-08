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
    mail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create a SMTP transporter object
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
            // Message object
            let message = {
                from: 'Eduardo <eduardidn@gmail.com>',
                // Comma separated list of recipients
                to: 'Eduardo <eduardidn@gmail.com>',
                bcc: 'eduardidn@gmail.com',
                // Subject of the message
                subject: 'Nodemailer is unicode friendly ✔',
                // plaintext body
                text: 'Hello to myself!',
                // HTML body
                html: '<p><b>Hello</b> to myself </p>',
                // An array of attachments
                attachments: [
                    // String attachment
                    {
                        filename: 'notes.txt',
                        content: 'Some notes about this e-mail',
                        contentType: 'text/plain' // optional, would be detected from the filename
                    }
                ]
            };
            try {
                let info = yield transporter.sendMail(message);
                res.json('Message sent successfully as %s', info.messageId);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
}
const mailController = new MailController;
exports.default = mailController;
