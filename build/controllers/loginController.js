"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const db_1 = __importDefault(require("../db"));
var nodemailer = require('nodemailer');
//var twilio = require('twilio');
class LoginController {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const usuario = yield db_1.default.query('SELECT * FROM usuarios Where email = ? or username = ?', [req.body.user, req.body.user]);
            if (usuario != "") {
                let savedPassword = usuario[0].password;
                let match = yield functions_1.default.matchPassword(password, savedPassword);
                if (match) {
                    let token = yield functions_1.default.getToken(req.body);
                    res.json({ message: "ok", token: token, user: usuario[0] });
                }
                else {
                    res.json({ message: "error" });
                }
            }
            else {
                res.json({ message: "error" });
            }
        });
    }
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            try {
                const admin = yield db_1.default.query('SELECT * FROM admin Where email = ? or username = ?', [req.body.user, req.body.user]);
                if (admin != "") {
                    let savedPassword = admin[0].password;
                    let match = yield functions_1.default.matchPassword(password, savedPassword);
                    if (match) {
                        let token = yield functions_1.default.getToken(req.body);
                        let tokenAdmin = yield functions_1.default.getTokenAdmin(req.body);
                        res.json({ message: "ok", token: token, tokenAdmin: tokenAdmin, user: admin[0] });
                    }
                    else {
                        res.json({ message: "error" });
                    }
                }
                else {
                    res.json({ message: "error" });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    loginEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const empresa = yield db_1.default.query('SELECT * FROM empresas Where email = ? or username = ?', [req.body.user, req.body.user]);
            if (empresa != "") {
                let savedPassword = empresa[0].password;
                let match = yield functions_1.default.matchPassword(password, savedPassword);
                if (match) {
                    let token = yield functions_1.default.getToken(req.body);
                    let tokenEmpresa = yield functions_1.default.getTokenEmpresa(req.body);
                    res.json({ message: "ok", token: token, tokenAdmin: tokenEmpresa, user: empresa[0] });
                }
                else {
                    res.json({ message: "error" });
                }
            }
            else {
                res.json({ message: "error" });
            }
        });
    }
    //ADMIN 
    updatePasswordNosotros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const { id } = req.params;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                yield db_1.default.query('UPDATE admin set ? WHERE id = ?', [req.body, id]);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.json({ message: "errorBD" });
            }
        });
    }
    //CONSULTS DE EMPRESA
    buscarEmpresaEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const empresas = yield db_1.default.query('SELECT * FROM empresas WHERE email = ?', [email]);
            if (empresas.length > 0) {
                res.json(empresas[0]);
            }
            else {
                res.json({ message: "error" });
            }
        });
    }
    buscarEmpresaUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresas = yield db_1.default.query('SELECT * FROM empresas WHERE username = ?', [req.body.username]);
            res.json(empresas);
        });
    }
    updatePasswordEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const { id } = req.params;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                yield db_1.default.query('UPDATE empresas set ? WHERE id = ?', [req.body, id]);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.json({ message: "errorBD" });
            }
        });
    }
    updatePasswordEmpresaByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const { email } = req.params;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                yield db_1.default.query('UPDATE empresas set ? WHERE email = ?', [req.body, email]);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.json({ message: "errorBD" });
            }
        });
    }
    //usuariosControllert
    //
    buscarUserEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where email = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    //
    buscarUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT * FROM usuarios Where email = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    //
    buscarUserUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where username = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    //
    buscarUserTelefono(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where telefono1 = ?', [req.body.telefono]);
            res.json(usuario);
        });
    }
    //
    buscarUserCedula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where cedula = ?', [req.body.cedula]);
            res.json(usuario);
        });
    }
    //
    getOneByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const usuarios = yield db_1.default.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            if (usuarios.length > 0) {
                return res.json(usuarios[0]);
            }
            res.json({ message: "error" });
        });
    }
    //
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                const usuario = yield db_1.default.query('INSERT INTO usuarios SET ?', [req.body]);
                if (usuario.affectedRows == 1) {
                    res.json({ message: "ok" });
                }
                else {
                    res.json({ message: "error" });
                }
            }
            catch (err) {
                res.json({ message: "errorBD" });
            }
        });
    }
    //
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const { email } = req.params;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                yield db_1.default.query('UPDATE usuarios set ? WHERE email = ?', [req.body, email]);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.json({ message: "errorBD" });
            }
        });
    }
    //
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    //MAILS
    mailBienvenido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
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
                subject: 'Bienvenido a Pidespeed',
                //text: 'Hello to myself!',
                html: `<head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido a Pidespeed</title>
            </head>
            <body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
                <div style="max-width: 600px;
                margin:  0 auto;">
                    <div style="text-align: center; margin-top: 1.5rem;">
                        <img src="https://ssl.pidespeed.com/correos/logo.png" style="width:50%; height: 100%">
                    </div>
                    <div style="text-align: center; padding-top: 3rem;">
                        <h1>Te damos la bienvenida a Pidespeed</h1>
                        <p style="padding: 0 .5rem;">Con Pidespeed.com puedes recibir tus productos favoritos en la comodidad de tu casa en cuestión de minutos, o puedes agilizar tu compra y recoger tu pedido en el local sin colas ni tarifas!</p>
                    </div>
                    <div style="text-align: center; display: flex; justify-content: center; padding-top: 3rem;">
                        <div style="margin-top: .5rem;">
                            <img src="https://ssl.pidespeed.com/correos/compra.png" style="width: 100%; margin-bottom: 1rem;">
                            <h3 style="font-size:1rem; font-weight: 400; margin: 0;">
                                Tus locales favoritos
                            </h3>
                        </div>
                        <div style="margin-top: .5rem;">
                            <img src="https://ssl.pidespeed.com/correos/delivery.png" style="width: 90%; margin-bottom: .5rem;">
                            <h3 style="font-size:1rem; font-weight: 400; margin: 0;">
                                Pedidos en tu puerta o pasas a recogerlo.
                            </h3>
                        </div>
                        <div style="margin-top: .5rem;">
                            <img src="https://ssl.pidespeed.com/correos/promotion.png" style="width: 100%; margin-bottom: 1rem;">
                            <h3 style="font-size:1rem; font-weight: 400; margin: 0;">
                                Mejores promociones
                            </h3>
                        </div>
                    </div>
                    <div style="text-align: center; padding: 3rem 0; margin-top: 1rem; background-color: rgb(247, 247, 247);">
                        <h2 style="margin: 0; font-size: 1.75rem;">¿Listo para ordenar?</h2>
                        <a href="https://pidespeed.com/" style="
                        padding: .5rem 3rem; 
                        margin-top: 1rem;             
                        display: inline-block;
                        font-weight: 400;
                        color: #212529;
                        text-align: center;
                        vertical-align: middle;
                        cursor: pointer;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        background-color: transparent;
                        border: 1px solid transparent;
                        font-size: 1rem;
                        line-height: 1.5;
                        border-radius: .25rem;
                        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                        color: #dc3545;
                        border-color: #dc3545;
                        border-radius: 50rem!important; 
                        text-decoration: none;">ORDENAR</a>
                    </div>
                    <div style="text-align: center; display: flex; justify-content: center; padding: 1.5rem 0;">
                        <div style="margin-top: 1rem;">
                            <h2 style="font-size: 1.25rem; margin:0;">Todo al alcance de tus manos!</h2>
                            <p style="padding: 0 .5rem;">Explora la ciudad directamente desde nuestra plataforma! Encontrarás variedad de restaurantes o tiendas que van desde postres, bebidas y comidas hasta cocinas específicas o minoristas. Escoge el de tu preferencia y haz tus pedidos desde la comodidad de tu casa, oficina o donde quiera que te encuentres!</p>
                        </div>
                    </div>
                    <div style="text-align: center; padding: 3rem 0; color: #fff; background-image: url(https://ssl.pidespeed.com/correos/meeting.jpg);">
                        <h4 style="font-size:1.25rem;">Síguenos en nuestras redes sociales</h1>
                            <div style="display: flex; justify-content: center; margin-top: 1rem;">
                                <a href="https://www.instagram.com/pidespeed/" style="padding: 0 3rem;">
                                    <img style="max-width: 125px; height: 100%; width: 100%;" src="https://ssl.pidespeed.com/correos/white-instagram-icon-png.png">
                                </a>
                                <a href="https://www.facebook.com/pidespeed/" style="padding: 0 3rem;">
                                    <img style="max-width: 80px; height: 100%; width: 100%;" src="https://ssl.pidespeed.com/correos/png-facebook-icon-3.png">
                                </a>
                            </div>
                        </div>
                    </div>
                </body>`,
            };
            try {
                let info = yield transporter.sendMail(message);
                res.json({ message: "ok" });
            }
            catch (err) {
                //res.status(400).json(err);
                console.log(err);
            }
        });
    }
    mailRecuperarPass(req, res) {
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
                subject: 'Recuperación de Contraseña',
                html: `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
                <div style="max-width: 600px;
                margin:  0 auto;">
                <div style="text-align: center; margin-top: 1.5rem;">
                    <img src="https://ssl.pidespeed.com/correos/logo.png" alt="Pidespeed Logo" style="height: 100%; width: 50%;">
                    <h1 style="color: #333;">Hola! ${nombre}</h1>
                    <p>Acabas de solicitar la recuperación de tu contraseña, intoduce el siguiente código para actualizarla!</p>
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
                //res.status(400).json(err);
                console.log(err);
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
                    user: 'Pidespeed@gmail.com',
                    pass: 'qphtkmofxbcvxkbl'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: 'PideSpeed <Pidespeed@gmail.com>',
                to: nombre + '<' + email + '>',
                subject: 'verifique su cuenta de PideSpeed',
                //text: 'Hello to myself!',
                html: `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
                <div style="max-width: 600px;
                margin:  0 auto;">
                <div style="text-align: center; margin-top: 1.5rem;">
                    <img src="./img/logo.png" alt="Pidespeed Logo" style="height: 100%; width: 50%;">
                    <h1 style="color: #333;">Hola! ${nombre}</h1>
                    <p>Has click en el siguiente boton para activar tu cuenta y disfrutar de todos nuestros servicios</p>
                </div>
                <div style="display: flex; justify-content: space-around; text-align: center; padding: 3rem 0; margin-top: 1rem;">
                    <img src="./img/confirmed.svg" width="200px height:100%">
                    <div>
                        <p style=" font-size: 1.25rem; font-weight: 400;
                        color: #ff414d;">Haz click aqui para verificar</p>
                        <a href="https://pidespeed.com/${link}" style="
                        padding: .5rem 3rem; 
                        margin-top: 1rem;             
                        display: inline-block;
                        font-weight: 400;
                        color: #212529;
                        text-align: center;
                        vertical-align: middle;
                        cursor: pointer;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        background-color: transparent;
                        border: 1px solid transparent;
                        font-size: 1rem;
                        line-height: 1.5;
                        border-radius: .25rem;
                        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                        color: #ffffff;
                        background-color: #ff414d;
                        border-radius: 50rem!important; 
                        text-decoration: none;">Verificar</a>
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
                //res.status(400).json(err);
                console.log(err);
            }
        });
    }
    mailPromocion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
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
                subject: '20% de DESCUENTO Para Ti',
                //text: 'Hello to myself!',
                html: `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
                <div style="max-width: 600px; margin: 0 auto;">
                  <div style="text-align: left;">
                    <div style="margin-bottom: 1rem;">
                      <img src="https://ssl.pidespeed.com/web/promocion-cuadrada.jpeg" style="width: 100%; height: auto;">
                    </div>
                    <div style="margin-top: 1rem; padding: 0 2rem;">
                      <p style="color: #ff414d; letter-spacing: -0.08px; font-size: 20px; line-height: 28px; margin-bottom: 2rem; font-weight: bold;">¡Hola ${nombre}!</p>        
                      <p style="letter-spacing: -0.08px; font-size: 18px; line-height: 28px; margin-bottom: 2rem;">Queremos asegurarnos de que ya conozcas la imperdible oferta de Bienvenida que hicimos para ti.</p>
                    <p style="letter-spacing: -0.08px; font-size: 18px; line-height: 28px; margin-bottom: 2rem;">Si lo que quieres es darte un gusto con una deliciosa comida, esta es la oportunidad perfecta!
                        Las mejores opciones en desayunos, almuerzos, cenas e incluso postres!
                        Toda la variedad que buscas en la ciudad, puedes ordenarla YA a través de PideSpeed.</p>
                    <p style="color: #ff414d; letter-spacing: -0.08px; font-size: 20px; line-height: 28px; margin-bottom: 2rem; font-weight: bold;">Y lo mejor de todo es que tendrás un ¡20% de Descuento en tu primera compra!</p>      
                    <p style="letter-spacing: -0.08px; font-size: 18px; line-height: 28px; margin-bottom: 2rem;">Ordena hasta la puerta de tu casa o sólo retira tu pedido cuando esté listo.</p>
                      <p style="letter-spacing: -0.08px; font-size: 18px; line-height: 28px; margin-bottom: 2rem;">¡Pide ya y no te pierdas de ésta promoción que hicimos especialmente para ti!</p>
                    </div>
                    <div style="padding: 0 2rem; margin-bottom: 2rem;">
                      <a href="https://pidespeed.com/login" style="
                      padding: .5rem 3rem; 
                      margin-top: 1rem;             
                      display: inline-block;
                      font-weight: 400;
                      color: #212529;
                      text-align: center;
                      vertical-align: middle;
                      cursor: pointer;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                      background-color: transparent;
                      border: 1px solid transparent;
                      font-size: 1rem;
                      line-height: 1.5;
                      border-radius: .25rem;
                      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                      color: #ffffff;
                      background-color: #ff414d;
                      border-radius: 50rem!important; 
                      text-decoration: none; 
                      display: block;">Compra ya!</a>
                    </div>
                  </div>
                  <div style="padding: 0 .8rem;">
                    <div style="background-color: rgb(247, 247, 247); padding: 1.5rem .8rem; ">
                      <h4 style="color: #333;">Equipo de Pidespeed</h4>
                      <hr>
                      <p>Si tienes alguna duda contáctanos a través de <a style="font-weight: 700; color: #ff414d; text-decoration: none;" href="https://pidespeed.com/help">Ayuda en línea</a></p>
                    </div>
                  </div>
                </div>
            </body>`,
            };
            try {
                let info = yield transporter.sendMail(message);
                res.json({ message: "ok" });
            }
            catch (err) {
                //res.status(400).json(err);
                console.log(err);
            }
        });
    }
}
const loginController = new LoginController;
exports.default = loginController;
