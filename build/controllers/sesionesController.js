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
class ProductosController {
    enviarMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const accountSid = 'ACb4dbe085f125405157f6b5978a6801b7';
            const authToken = 'cd2bb35c0d4c8b9dd1e9fd913f8b3aa6';
            const client = twilio(accountSid, authToken);
            client.messages.create({
                body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                from: '+12058094521',
                to: '+584124282595'
            }).then((message:any) => res.json(message.sid), (err:any) => res.json(err)) */
        });
    }
    buscarUserEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where email = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    buscarEmpresaEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const empresas = yield db_1.default.query('SELECT * FROM empresas WHERE email = ?', [email]);
            if (empresas.length > 0) {
                return res.json(empresas[0]);
            }
            res.json({ message: "error" });
        });
    }
    buscarUserUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where username = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    buscarUserTelefono(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where telefono1 = ?', [req.body.telefono]);
            res.json(usuario);
        });
    }
    buscarUserCedula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where cedula = ?', [req.body.cedula]);
            res.json(usuario);
        });
    }
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
    createEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*let password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(password, salt);
            req.body.password = passHash;
            const productos = await db.query('INSERT INTO empresas SET ?', [req.body]);
            res.json(productos);*/
        });
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*let password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(password, salt);
            req.body.password = passHash;
            const productos = await db.query('INSERT INTO admins SET ?', [req.body]);
            res.json(productos);*/
        });
    }
    loginEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const admin = yield db_1.default.query('SELECT * FROM empresas Where email = ? or username = ?', [req.body.user, req.body.user]);
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
        });
    }
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
    updatePasswordAdmin(req, res) {
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
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    mailBienvenido1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
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
                subject: 'Bienvenido a Pidespeed',
                //text: 'Hello to myself!',
                html: `<head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido a Pidespeed</title>
                <style>
                    body {
                        font-family: 'Roboto', sans-serif;
                    }
                    p {
                        margin-top: 0;
                        margin-bottom: 1rem;
                    }
                    img {
                        vertical-align: middle;
                        border-style: none;
                    }
                    a {
                        text-decoration: none!important;
                    }
                    .col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
                        position: relative;
                        width: 100%;
                        padding-right: 15px;
                        padding-left: 15px;
                    }
                    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
                        margin-bottom: .5rem;
                        font-weight: 500;
                        line-height: 1.2;
                    }
                    .h5, h5 {
                        font-size: 1.25rem;
                    }
                    
                    .h3, h3 {
                        font-size: 1.75rem;
                    }
                    .font-weight-light {
                        font-weight: 300!important;
                    }
                    .text-uppercase {
                        text-transform: uppercase!important;
                    }
                    .container {
                        max-width: 600px;
                        margin:  0 auto;
                    }
                    .w-75 {
                        width: 75%!important;
                    }
                    .w-100 {
                        width: 100%!important;
                    }
                    
                    .bg-grey-light {
                        background: rgb(246, 246, 246);
                    }
                    .text-white {
                        color: #fff!important;
                    }
                    .img-fluid {
                        max-width: 100%;
                        height: auto;
                    }
                    .w-50 {
                        width: 50%!important;
                    }
                    .w-25 { 
                        width: 25%important;
                    }
                    .text-center {
                        text-align: center!important;
                    }
                    .mb-2, .my-2 {
                        margin-bottom: .5rem!important;
                    }
                    .mt-4, .my-4 {
                        margin-top: 1.5rem!important;
                    }
                    .mt-3, .my-3 {
                        margin-top: 1rem!important;
                    }
                    .mb-3, .my-3 {
                        margin-bottom: 1rem!important;
                    }
                    .mt-5, .my-5 {
                        margin-top: 3rem!important;
                    }
                    .pt-5, .py-5 {
                        padding-top: 3rem!important;
                    }
                    .pl-5, .px-5 {
                        padding-left: 3rem!important;
                    }
                    .pr-5, .px-5 {
                        padding-right: 3rem!important;
                    }
                    .pr-2, .px-2 {
                        padding-right: .5rem!important;
                    }
                    .pl-2, .px-2 {
                        padding-left: .5rem!important;
                    }
                    .pb-4, .py-4 {
                        padding-bottom: 1.5rem!important;
                    }
                    .pb-5, .py-5 {
                        padding-bottom: 3rem!important;
                    }
                    .pt-5, .py-5 {
                        padding-top: 3rem!important;
                    }
                    .row {
                        display: -ms-flexbox;
                        display: flex;
                        -ms-flex-wrap: wrap;
                        flex-wrap: wrap;
                        margin-right: -15px;
                        margin-left: -15px;
                    }
                    .no-gutters {
                        margin-right: 0;
                        margin-left: 0;
                    }
                    .d-flex {
                        display: flex;
                    }
                    
                    .justify-content-center {
                        -ms-flex-pack: center!important;
                        justify-content: center!important;
                    }
                    .rounded-pill {
                        border-radius: 50rem!important;
                    }
                    .btn {
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
                        padding: .375rem .75rem;
                        font-size: 1rem;
                        line-height: 1.5;
                        border-radius: .25rem;
                        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                    }
                    .btn-outline-danger {
                        color: #dc3545;
                        border-color: #dc3545;
                    }     
                    .text-danger {
                        color: #dc3545!important;
                    }   
                    .col-8 {
                        -ms-flex: 0 0 66.666667%;
                        flex: 0 0 66.666667%;
                        max-width: 66.666667%;
                    }
                    .col-12 {
                        -ms-flex: 0 0 100%;
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                    @media screen and (min-width: 768px) {
                        .h-150p {
                            height: 150px;
                        }
                        .col-md {
                            -ms-flex-preferred-size: 0;
                            flex-basis: 0;
                            -ms-flex-positive: 1;
                            flex-grow: 1;
                            max-width: 100%;
                        }
                        .col-md-8 {
                            -ms-flex: 0 0 66.666667%;
                            flex: 0 0 66.666667%;
                            max-width: 66.666667%;
                        }
                    }
                    @media (min-width: 992px) {
                        .pl-lg-4, .px-lg-4 {
                            padding-left: 1.5rem!important;
                        }
                        .pr-lg-4, .px-lg-4 {
                            padding-right: 1.5rem!important;
                        }
                    }
                    .bg-redes {
                        background: url(https://ssl.pidespeed.com/correos/meeting.jpg);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="text-center mt-4">
                        <img src="https://ssl.pidespeed.com/correos/logo.png" alt="Pidespeed Logo" class="img-fluid w-50">
                    </div>
                    <div class="text-center pt-5">
                        <h1>Gracias por unirte a Pidespeed</h1>
                        <p class="px-2 px-lg-4">Te damos la bienvenida a nuestra plataforma, con Pidespeed.com puede recibir sus productos favoritos en su puerta en cuestión de minutos, o puede recoger su pedido usted mismo para la máxima comodidad, sin colas ni tarifas! le avisaremos cuando este listo.</p>
                    </div>
                    <div class="text-center row justify-content-center pt-5">
                        <div class="col-8 col-md mt-3">
                            <img src="https://ssl.pidespeed.com/correos/compra.png" alt="" class="img-fluid mb-3">
                            <h3 class="h5 font-weight-light">
                                Tus locales favoritos
                            </h3>
                        </div>
                        <div class="col-8 col-md mt-3">
                            <img src="https://ssl.pidespeed.com/correos/delivery.png" alt="" class="img-fluid w-75 mb-2">
                            <h3 class="h5 font-weight-light">
                                Entrega a domicilio o pasas a recogerlo.
                            </h3>
                        </div>
                        <div class="col-8 col-md mt-3">
                            <img src="https://ssl.pidespeed.com/correos/promotion.png" alt="" class="img-fluid mb-3">
                            <h3 class="h5 font-weight-light">
                                Gasta menos tiempo y dinero con nuestras promociones
                            </h3>
                        </div>
                    </div>
                    <div class="text-center py-5 mt-3 bg-grey-light">
                        <h2 class="h3">¿Listo para ordenar?</h2>
                        <a href="https://pidespeed.com/" class="btn btn-outline-danger rounded-pill text-uppercase px-5 mt-3">Ordenar</a>
                    </div>
                    <div class="text-center row justify-content-center mt-5 py-4">
                        <div class="col-8 col-md">
                            <img src="https://ssl.pidespeed.com/correos/MovilRojo.png" alt="" class="img-fluid mb-3">
                        </div>
                        <div class="col-12 col-md-8 mt-3">
                            <h2 class="h5">Todo al alcance de tus manos!</h2>
                            <p>Ya sea que se trate de bebidas, comidas, cocinas específicas o minoristas, puedes explorar la ciudad directamente desde el nuestra plataforma. con el fin de que puedar realizar pedidos a tus restaurantes y tiendas favoritas desde la comodidad de tu casa, oficina o donde te encuentres!</p>
                        </div>
                    </div>
                    <div class="text-center row no-gutters bg-grey-light pb-4 mt-5">
                        <div class="col-12 col-md mt-4">
                            <h3 class="h5 text-danger font-weight-bolder">
                                Aprovecha nuestras ofertas!
                            </h3>
                            <img src="https://ssl.pidespeed.com/correos/articulos.jpg" alt="" class="img-fluid h-150p w-100">
                            <a href="https://pidespeed.com/" class="btn btn-outline-danger rounded-pill text-uppercase px-5 mt-3">Aprende como</a>
                        </div>
                        <div class="col-12 col-md mt-4">
                            <h3 class="h5 text-danger font-weight-bolder">
                                Sáltate la cola y las tarifas
                            </h3>
                            <img src="https://ssl.pidespeed.com/correos/pidespeedweb.jpg" alt="" class="img-fluid h-150p w-100">
                            <a href="https://pidespeed.com/" class="btn btn-outline-danger rounded-pill text-uppercase px-5 mt-3">Aprende como</a>
                        </div>
                    </div>
                    <div class="text-center py-5 bg-redes text-white">
                        <h4 class="h3">Síguenos en nuestras redes sociales</h1>
                        <div class="d-flex justify-content-center mt-3">
                            <a href="https://www.instagram.com/pidespeed/" class="px-5">
                                <img style="max-width: 125px;" src="https://ssl.pidespeed.com/correos/white-instagram-icon-png.png" class="img-fluid" alt="Instagram icon">
                            </a>
                            <a href="https://www.facebook.com/pidespeed/" class="px-5">
                                <img style="max-width: 80px;" src="https://ssl.pidespeed.com/correos/png-facebook-icon-3.png" class="img-fluid" alt="Facebook icon">
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
                res.status(400).json(err);
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
                subject: 'verifique su cuenta de PideSpeed',
                //text: 'Hello to myself!',
                html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">

                <!-- START HEADER/BANNER -->

                <tbody>
                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0">
                <tbody>
                <tr>
                <td align="center" valign="top"
                background="#fff"
                bgcolor="#fff"
                style="background-size:cover; background-position:center;height:400">
                <table class=" col-600"
                width="600"
                height="50"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr>
                <td
                height="40">
                </td>
                </tr>


                <tr>
                <td align="center"
                style="line-height: 0px;">
                <img class="logo"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                src="https://pedidospeed.herokuapp.com/correos/3.png"
                width="150"
                height="auto"
                alt="logo">
                </td>
                </tr>



                <tr>
                <!-- <td align="center"
                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
                PIDESPEED
                <span
                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 7px;">C.A</span>
                </td> -->
                </tr>





                <tr>
                <!-- <td align="center"
                style="font-family:
                'Lato',
                sans-serif;
                padding:
                20px;
                font-size:15px;
                color:#ffffff;
                line-height:24px;
                font-weight:
                300;">

                Te
                damos
                la
                bienvenida
                a
                nuestra
                plataforma,
                con
                el
                fin
                de
                que
                puedar
                realizar
                pedidos
                a
                tus
                restaurantes
                y
                tiendas
                favoritas
                desde
                la
                comodidad
                de
                tu
                casa,
                oficina
                o
                donde
                te
                encuentres!

                </td> -->
                </tr>


                <tr>
                <td
                height="50">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END HEADER/BANNER -->


                <!-- START 3 BOX SHOWCASE -->

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td height="35"></td>
                </tr>

                <tr>
                <td class="gridMovilTitle"
                align="center" style="font-family: 'Raleway',
                sans-serif; font-size:28px;
                font-weight: bold;
                color:#2f2f2f;">
                ${nombre}!
                </td>
                </tr>

                <tr>
                <td height="10"></td>
                </tr>


                <tr>
                <td class="gridMovilText" align="center"
                style="font-family: 'Lato',
                sans-serif; font-size:18px;
                color:#4d4d4d;
                line-height:24px; font-weight:
                300; padding: 20px;">
                Acabas de solicitar la recuperación de tu contraseña, intoduce el siguiente codigo para poder actualizar tu contraseña!!
                <br>

                </td>
                </tr>

                </tbody>
                </table>
                </td>
                </tr>

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; ">
                <tbody>
                <tr>
                <td height="10"></td>
                </tr>
                <tr>

                </tr>
                </tbody>
                </table>
                </td>
                </tr>

                <tr>
                <td height="30px"></td>
                </tr>


                <!-- END 3 BOX SHOWCASE -->


                <!-- START AWESOME TITLE -->

                <tr>
                <td align="center">
                <table align="center" class="col-600" width="600" border="0"
                cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                <td align="center" bgcolor="#f7f7f7">
                <table class="col-600"
                width="600"
                align="center"
                border="0"
                cellspacing="0"
                cellpadding="0">
                <tbody>
                <tr>
                <td
                height="33">
                </td>
                </tr>
                <tr>
                <td>


                <table class="col1"
                width="183"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr>
                <td
                height="18">
                </td>
                </tr>

                <tr>
                <td
                align="center">
                <img class="gridMovilImg"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                class="images_style"
                src="https://pedidospeed.herokuapp.com/correos/confirmed.png"
                alt="img"
                width="156"
                height="136">
                </td>



                </tr>
                </tbody>
                </table>



                <table class="col3_one"
                width="380"
                border="0"
                align="right"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr align="left"
                valign="top">
                <td class="gridMovilText"
                style="font-family:
                'Raleway',
                sans-serif;
                text-align:
                center;
                font-size:20px;
                color:#ff3e4c;
                line-height:30px;
                font-weight:
                bold;">
                Tu
                codigo
                de
                confirmación
                es:
                </td>
                </tr>


                <tr>
                <td
                height="50px">
                </td>
                </tr>


                <tr align="left"
                valign="top">
                <td
                style="font-family:
                'Lato',
                sans-serif;
                font-size:45px;
                color:#ff3e4c;
                line-height:30px;
                font-weight:
                bold; text-align: center;">
                ${codigo}
                </td>
                </tr>

                <tr>
                <td
                height="10">
                </td>
                </tr>

                <tr align="left"
                valign="top">
                <td>
                <!-- <table class="button"
                style="border: 2px solid #fff;"
                bgcolor="#2b3c4d"
                width="200px"
                height="48px"
                border="0"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                width="10">
                </td>
                <td height="30"
                align="center"
                style="font-family: 'Open Sans', Arial, sans-serif; font-size:16px; color:#ffffff;">
                <a href="#"
                style="color:#ffffff;">Confirmar
                tu
                cuenta</a>
                </td>
                <td
                width="10">
                </td>
                </tr>
                </tbody>
                </table> -->
                </td>
                </tr>

                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td
                height="33">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END AWESOME TITLE -->


                <!-- START WHAT WE DO -->

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="margin-left:20px; margin-right:20px;">



                <tbody>
                <tr>
                <td align="center">
                <table class="col-600 tableMovil"
                width="600"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td
                height="50">
                </td>
                </tr>
                <tr>
                <td class="gridMovil"
                align="right">


                <table class="col2 tableMovil"
                width="287"
                border="0"
                align="right"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td align="center"
                style="line-height:0px;">
                <img class="gridMovilImgBig"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                class="images_style"
                src="https://pedidospeed.herokuapp.com/correos/chat.png"
                width="169"
                height="138">
                </td>
                </tr>
                </tbody>
                </table>






                <table class="tableMovil"
                width="287"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0"
                class="col2"
                style="">
                <tbody>
                <tr>
                <td
                align="center">
                <table class="insider tableMovil"
                width="237"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">



                <tbody>
                <tr
                align="left">
                <td class="gridMovilTitle"
                style="font-family: 'Raleway', sans-serif; font-size:23px; color:#2a3b4c; line-height:30px; font-weight: bold;">
                ¿Necesitas
                ayuda?
                </td>
                </tr>

                <tr>
                <td
                height="5">
                </td>
                </tr>


                <tr>
                <td class="gridMovilText"
                style="font-family: 'Lato', sans-serif; font-size:15px; color:#7f8c8d; line-height:24px; font-weight: 300;">


                Cualquier
                inconveniente
                puedes
                contactarnos
                a
                través
                de
                <a style="color: #ff3e4c; text-decoration: none; font-weight: bold;"
                href="">Ayuda
                en
                línea</a>,
                en
                nuestras
                redes
                sociales,
                o
                ir
                a
                nuestra
                sección
                de
                <a style="color: #ff3e4c; text-decoration: none; font-weight: bold;"
                href="">preguntas
                frecuentes.</a>
                </td>
                </tr>


                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END WHAT WE DO -->









                <!-- START FOOTER -->

                <tr>
                <td align="center">
                <table align="center"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td
                height="50">
                </td>
                </tr>
                <tr>
                <td align="center"
                style="
                background-size:
                cover;
                background-position:
                center;" bgcolor="#34495e"
                background="https://pedidospeed.herokuapp.com/correos/meeting5.jpg"
                height="185">
                <table class="col-600"
                width="600"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                height="25">
                </td>
                </tr>

                <tr>
                <td align="center"
                style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#ffffff;">
                Siguenos
                en
                nuestras
                redes
                sociales!
                </td>
                </tr>


                <tr>
                <td
                height="25">
                </td>
                </tr>



                </tbody>
                </table>
                <table align="center"
                width="35%"
                border="0"
                cellspacing="0"
                cellpadding="0">
                <tbody>
                <tr>
                <td align="center"
                width="30%"
                style="vertical-align: top;">
                <a href="https://www.facebook.com/designmodo"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-fb.png">
                </a>
                </td>

                <td align="center"
                class="margin"
                width="30%"
                style="vertical-align: top;">
                <a href="https://twitter.com/designmodo"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-twitter.png">
                </a>
                </td>

                <td align="center"
                width="30%"
                style="vertical-align: top;">
                <a href="https://plus.google.com/+Designmodo/posts"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-googleplus.png">
                </a>
                </td>
                </tr>
                </tbody>
                </table>



                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>

                <!-- END FOOTER -->

                </tbody>
                </table>`,
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
    mailBienvenido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
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
                subject: 'Bienvenido a Pidespeed',
                //text: 'Hello to myself!',
                html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                <tbody>
                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0">
                <tbody>
                <tr>
                <td align="center" valign="top" background="#fff" bgcolor="#fff" style="background-size:cover; background-position:center;height:400">
                <table class=" col-600" width="600" height="50" border="0" align="center" cellpadding="0" cellspacing="0">
                <tbody>
                <tr>
                <td
                height="40">
                </td>
                </tr>


                <tr>
                <td align="center"
                style="line-height: 0px;">
                <img class="logo"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                src="https://pedidospeed.herokuapp.com/correos/3.png"
                width="150"
                height="auto"
                alt="logo">
                </td>
                </tr>



                <tr>
                <!-- <td align="center"
                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
                PIDESPEED
                <span
                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 7px;">C.A</span>
                </td> -->
                </tr>





                <tr>
                <!-- <td align="center"
                style="font-family:
                'Lato',
                sans-serif;
                padding:
                20px;
                font-size:15px;
                color:#ffffff;
                line-height:24px;
                font-weight:
                300;">

                Te
                damos
                la
                bienvenida
                a
                nuestra
                plataforma,
                con
                el
                fin
                de
                que
                puedar
                realizar
                pedidos
                a
                tus
                restaurantes
                y
                tiendas
                favoritas
                desde
                la
                comodidad
                de
                tu
                casa,
                oficina
                o
                donde
                te
                encuentres!

                </td> -->
                </tr>


                <tr>
                <td
                height="50">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td height="35"></td>
                </tr>

                <tr>
                <td align="center"
                class="gridMovilTitle"
                style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#333;">
                Gracias
                por
                unirte
                a
                PIDESPEED
                C.A.
                </td>
                </tr>

                <tr>
                <td height="10"></td>
                </tr>


                <tr>
                <td align="center" class="gridMovilText"
                style="font-family: 'Lato', sans-serif; padding:5px 20px;font-size:14px; color:#757575; line-height:24px; font-weight: 300;">

                Te
                damos
                la
                bienvenida
                a
                nuestra
                plataforma, con
                PIDESPEED puede recibir sus
                cosas favoritas en su puerta
                en cuestión de minutos, o
                puede recoger su pedido
                usted mismo para la máxima
                comodidad, sin colas ni
                tarifas! le avisaremos cuando
                este listo.<br>




                </td>
                </tr>

                </tbody>
                </table>
                </td>
                </tr>

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; ">
                <tbody>
                <tr>
                <td height="10"></td>
                </tr>
                <tr>
                <td class="gridMovil">


                <table class="col3"
                width="183"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                height="30">
                </td>
                </tr>
                <tr>
                <td
                align="center">
                <table class="insider"
                width="133"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr align="center"
                style="line-height:0px;">
                <td>
                <img class="gridMovilImg"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                src="https://pedidospeed.herokuapp.com/correos/compra.png"
                width="150"
                height="100"
                alt="icon">
                </td>
                </tr>


                <tr>
                <td
                height="15">
                </td>
                </tr>


                <tr
                align="center">
                <td class="gridMovilTitle"
                style="font-family: 'Raleway', Arial, sans-serif; font-size:20px; color:#2b3c4d; line-height:24px; font-weight: bold;">
                Tus
                locales
                Favoritos
                </td>
                </tr>


                <tr>
                <td
                height="10">
                </td>
                </tr>


                <!-- <tr
                align="center">
                <td
                style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                Entrega
                a
                domicilio
                o
                pasas
                a
                recogerlo.
                </td>
                </tr> -->

                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td
                height="30">
                </td>
                </tr>
                </tbody>
                </table>





                <table width="1" height="20"
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="left">
                <tbody>
                <tr>
                <td height="20"
                style="font-size: 0;line-height: 0;border-collapse: collapse;">
                <p
                style="padding-left: 24px;">
                &nbsp;
                </p>
                </td>
                </tr>
                </tbody>
                </table>



                <table class="col3"
                width="183"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                height="30">
                </td>
                </tr>
                <tr>
                <td
                align="center">
                <table class="insider"
                width="133"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr align="center"
                style="line-height:0px;">
                <td>
                <img class="gridMovilImg"
                style="
                display:block;
                line-height:0px;
                font-size:0px;
                border:0px;"
                src="https://pedidospeed.herokuapp.com/correos/delivery.png"
                width="100"
                height="100"
                alt="icon">
                </td>
                </tr>


                <tr>
                <td
                height="15">
                </td>
                </tr>


                <tr
                align="center">
                <td class="gridMovilTitle"
                style="font-family: 'Raleway', sans-serif; font-size:20px; color:#2b3c4d; line-height:24px; font-weight: bold;">
                Entrega
                a
                domicilio
                o
                pasas
                a
                recogerlo.
                </td>
                </tr>


                <tr>
                <td
                height="10">
                </td>
                </tr>


                <!-- <tr
                align="center">
                <td
                style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                Place
                some
                cool
                text
                here.
                </td>
                </tr> -->



                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td
                height="30">
                </td>
                </tr>
                </tbody>
                </table>



                <table width="1" height="20"
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="left">
                <tbody>
                <tr>
                <td height="20"
                style="font-size: 0;line-height: 0;border-collapse: collapse;">
                <p
                style="padding-left: 24px;">
                &nbsp;
                </p>
                </td>
                </tr>
                </tbody>
                </table>



                <table class="col3"
                width="183"
                border="0"
                align="right"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                height="30">
                </td>
                </tr>
                <tr>
                <td
                align="center">
                <table class="insider"
                width="133"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr align="center"
                style="line-height:0px;">
                <td>
                <img class="gridMovilImg"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                src="https://pedidospeed.herokuapp.com/correos/promotion.png"
                width="150"
                height="100"
                alt="icon">
                </td>
                </tr>


                <tr>
                <td
                height="15">
                </td>
                </tr>


                <tr
                align="center">
                <td class="gridMovilTitle"
                style="font-family: 'Raleway',  sans-serif; font-size:20px; color:#2b3c4d; line-height:24px; font-weight: bold;">
                Gasta
                menos
                tiempo
                y
                dinero
                con
                nuestras
                promociones
                </td>
                </tr>


                <tr>
                <td
                height="10">
                </td>
                </tr>


                <!-- <tr
                align="center">
                <td
                style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                Place
                some
                cool
                text
                here.
                </td>
                </tr> -->

                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td
                height="30">
                </td>
                </tr>
                </tbody>
                </table>


                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>

                <tr>
                <td height="5"></td>
                </tr>


                <!-- END 3 BOX SHOWCASE -->


                <!-- START AWESOME TITLE -->

                <tr>
                <td align="center">
                <table align="center" class="col-600" width="600" border="0"
                cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                <td align="center" bgcolor="#f9f9f9">
                <table class="col-600"
                width="600"
                align="center"
                border="0"
                cellspacing="0"
                cellpadding="0">
                <tbody>
                <tr>
                <td
                height="33">
                </td>
                </tr>
                <tr>
                <td
                class="gridMovil">


                <table class="col1"
                width="183"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr>
                <td
                height="18">
                </td>
                </tr>

                <tr>
                <td
                align="center">
                <img class="gridMovilImgSmall"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                class="images_style"
                src="https://pedidospeed.herokuapp.com/correos/MovilRojo.png"
                alt="img"
                width="156"
                height="136">
                </td>



                </tr>
                </tbody>
                </table>



                <table class="col3_one"
                width="380"
                border="0"
                align="right"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr align="left"
                valign="top">
                <td class="gridMovilTitle"
                style="font-family: 'Raleway', sans-serif; font-size:20px; color:#333; line-height:30px; font-weight: bold;">
                Todo
                al
                alcance
                de
                tus
                manos!
                </td>
                </tr>


                <tr>
                <td
                height="5">
                </td>
                </tr>


                <tr align="left"
                valign="top">
                <td class="gridMovilText"
                style="font-family: 'Lato', sans-serif; font-size:14px; color:rgb(75, 74, 74); line-height:24px; font-weight: 300; padding: 15px;">
                Ya
                sea
                que
                se
                trate
                de
                bebidas,
                comidas,
                cocinas
                específicas
                o
                minoristas,
                puedes
                explorar
                la
                ciudad

                directamente
                desde
                el
                nuestra
                plataforma.

                con
                el
                fin
                de
                que
                puedar
                realizar
                pedidos
                a
                tus
                restaurantes
                y
                tiendas
                favoritas
                desde
                la
                comodidad
                de
                tu
                casa,
                oficina
                o
                donde
                te
                encuentres!
                </td>
                </tr>

                <tr>
                <td
                height="10">
                </td>
                </tr>

                <tr align="left"
                valign="top">
                <td>
                <table class="button"
                style="border: 2px solid #fff;"
                bgcolor="#2b3c4d"
                width="30%"
                border="0"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                width="10">
                </td>
                <!-- <td height="30"
                align="center"
                style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#ffffff;">
                <a href="#"
                style="color:#ffffff;">Read
                more</a>
                </td> -->
                <td
                width="10">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>

                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <!-- <td
                height="33">
                </td> -->
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END AWESOME TITLE -->


                <!-- START WHAT WE DO -->

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="margin-left:20px; margin-right:20px;">



                <tbody>
                <tr>
                <td align="center">
                <table class="col-600"
                width="600"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <!-- <td
                height="50">
                </td> -->
                </tr>
                <tr>
                <td
                align="right">


                <table class="col2"
                width="287"
                border="0"
                align="right"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <!-- <td align="center"
                style="line-height:0px;">
                <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                class="images_style"
                src="https://designmodo.com/demo/emailtemplate/images/icon-responsive.png"
                width="169"
                height="138">
                </td> -->
                </tr>
                </tbody>
                </table>






                <table width="287"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0"
                class="col2"
                style="">
                <tbody>
                <tr>
                <td
                align="center">
                <table class="insider"
                width="237"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">



                <tbody>
                <tr
                align="left">
                <!-- <td
                style="font-family: 'Raleway', sans-serif; font-size:23px; color:#2a3b4c; line-height:30px; font-weight: bold;">
                ¿Quienes
                somos?
                </td> -->
                </tr>

                <tr>
                <!-- <td
                height="5">
                </td> -->
                </tr>


                <tr>
                <!-- <td
                style="font-family: 'Lato', sans-serif; font-size:14px; color:#7f8c8d; line-height:24px; font-weight: 300;">
                We
                create
                responsive
                websites
                with
                modern
                designs
                and
                features
                for
                small
                businesses
                and
                organizations
                that
                are
                professionally
                developed
                and
                SEO
                optimized.
                </td> -->
                </tr>


                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END WHAT WE DO -->



                <!-- START READY FOR NEW PROJECT -->

                <tr>
                <td align="center">
                <table align="center"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="">
                <tbody>
                <tr>
                <!-- <td height="
                50">
                </td> -->
                </tr>
                <tr>


                <td align="center"
                bgcolor="#ffffff"
                style="padding-top:20px;">
                <table class="col-600"
                width="600"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <!-- <td
                height="35">
                </td> -->
                </tr>


                <tr>
                <td class="gridMovilText"
                align="center"
                style="font-family: 'Raleway', sans-serif; font-size:20px; color:#333; line-height:24px; font-weight: bold;">
                ¿Listo
                para
                ordenar?
                </td>
                </tr>


                <tr>
                <td
                height="20">
                </td>
                </tr>


                <tr>
                <td align="center" ">
                <a
                href=""
                style="
                font-family: 'Lato'
                ,
                sans-serif;
                font-size:
                16px;
                color:
                #ff3e4c;
                border:
                1px
                solid
                #ff3e4c;
                padding:
                10px
                30px;
                text-decoration:
                none;
                font-weight:
                bold;
                border-radius:
                50px;">
                Ordenar!</a>

                </td>
                </tr>


                <tr>
                <td
                height="40">
                </td>
                </tr>

                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END READY FOR NEW PROJECT -->


                <!-- START PRICING TABLE -->

                <tr>
                <td align="center">
                <table width="600"
                class="col-600"
                align="center"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td
                height="50">
                </td>
                </tr>
                <tr>
                <td
                class="gridMovil">


                <table class="col2 tableMovil"
                width="287"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0">


                <tbody>
                <tr>
                <td class="gridMovilText"
                height="40"
                align="center"
                bgcolor="#f9f9f9"
                style="font-family:
                'Raleway',
                sans-serif;
                font-size:18px;
                color:#ff3e4c;
                line-height:30px;
                font-weight:
                bold;">
                Aprovecha
                nuestras
                ofertas!
                </td>
                </tr>


                <tr>
                <td style="background: url(https://pedidospeed.herokuapp.com/correos/articulos2.jpg); background-position: center;
                background-size: cover; height: 145px;"
                align="center">
                <table class="insider"
                width="237"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                height="20">
                </td>
                </tr>

                <tr align="center"
                style="line-height:0px;">
                <!-- <td
                style="font-family: 'Lato', sans-serif; font-size:48px; color:#2b3c4d; font-weight: bold; line-height: 44px;">
                $150
                </td> -->
                </tr>


                <tr>
                <td
                height="15">
                </td>
                </tr>


                <tr>
                <td
                height="15">
                </td>
                </tr>



                <tr>
                <td
                align="center">
                <table width="250"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                width="10">
                </td>
                <!-- <td height="30"
                align="center">
                <a href="#"
                style="
                font-family: 'Lato'
                ,
                sans-serif;
                font-size:
                16px;
                color:
                #ff3e4c;
                border:
                1px
                solid
                #ff3e4c;
                padding:
                10px
                30px;
                text-decoration:
                none;
                font-weight:
                bold;
                border-radius:
                50px;">Aprende
                como</a>
                </td> -->
                <td
                width="10">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td height="60"
                align="center">
                <a href="#"
                style="
                font-family: 'Lato'
                ,
                sans-serif;
                font-size:
                16px;
                color:
                #ff3e4c;
                border:
                1px
                solid
                #ff3e4c;
                padding:
                10px
                30px;
                text-decoration:
                none;
                font-weight:
                bold;
                border-radius:
                50px;">Aprende
                como</a>
                </td>
                </tr>
                </tbody>
                </table>





                <table width="1"
                height="20"
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="left">
                <tbody>
                <tr>
                <td height="20"
                style="font-size: 0;line-height: 0;border-collapse: collapse;">
                <p
                style="padding-left: 24px;">
                &nbsp;
                </p>
                </td>
                </tr>
                </tbody>
                </table>


                <table class="
                col2
                tableMovil"
                width="287"
                border="0"
                align="right"
                cellpadding="0"
                cellspacing="0">


                <tbody>
                <tr>
                <td class="gridMovilText"
                height="40"
                align="center"
                bgcolor="#f9f9f9"
                style="font-family:
                'Raleway',
                sans-serif;
                font-size:18px;
                color:#ff3e4c;
                line-height:30px;
                font-weight:
                bold;">
                Sáltate
                la
                cola
                y
                las
                tarifas.

                </td>
                </tr>


                <tr>
                <td style="background: url(https://pedidospeed.herokuapp.com/correos/web2.jpg); background-position: center;
                background-size: cover; height: 145px;"
                align="center">
                <table class="insider"
                width="237"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                height="20">
                </td>
                </tr>

                <tr align="center"
                style="line-height:0px;">
                <!-- <td
                style="font-family: 'Lato', sans-serif; font-size:48px; color:#2b3c4d; font-weight: bold; line-height: 44px;">
                $289
                </td> -->
                </tr>


                <tr>
                <td
                height="30">
                </td>
                </tr>



                <tr
                align="center">
                <td>
                <table width="250"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                width="10">
                </td>
                <!-- <td height="30"
                align="center">
                <a href="#"
                style="font-family:
                'Lato'
                ,
                sans-serif;
                font-size:
                16px;
                color:
                #ff3e4c;
                border:
                1px
                solid
                #ff3e4c;
                padding:
                10px
                30px;
                text-decoration:
                none;
                font-weight:
                bold;
                border-radius:
                50px;">Descubrir
                como!</a>
                </td> -->
                <td
                width="10">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td height="60"
                align="center">
                <a href="#"
                style="
                font-family: 'Lato'
                ,
                sans-serif;
                font-size:
                16px;
                color:
                #ff3e4c;
                border:
                1px
                solid
                #ff3e4c;
                padding:
                10px
                30px;
                text-decoration:
                none;
                font-weight:
                bold;
                border-radius:
                50px;">Aprende
                como</a>
                </td>
                </tr>
                </tbody>
                </table>

                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END PRICING TABLE -->


                <!-- START FOOTER -->

                <tr>
                <td align="center">
                <table align="center"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td
                height="50">
                </td>
                </tr>
                <tr>
                <td align="center"
                style="
                background-size:
                cover;
                background-position:
                center;" bgcolor="#34495e"
                background="https://pedidospeed.herokuapp.com/correos/meeting5.jpg"
                height="185">
                <table class="col-600"
                width="600"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                height="25">
                </td>
                </tr>

                <tr>
                <td align="center"
                style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#ffffff;">
                Siguenos
                en
                nuestras
                redes
                sociales!
                </td>
                </tr>


                <tr>
                <td
                height="25">
                </td>
                </tr>



                </tbody>
                </table>
                <table align="center"
                width="35%"
                border="0"
                cellspacing="0"
                cellpadding="0">
                <tbody>
                <tr>
                <td align="center"
                width="30%"
                style="vertical-align: top;">
                <a href="https://www.facebook.com/designmodo"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-fb.png">
                </a>
                </td>

                <td align="center"
                class="margin"
                width="30%"
                style="vertical-align: top;">
                <a href="https://twitter.com/designmodo"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-twitter.png">
                </a>
                </td>

                <td align="center"
                width="30%"
                style="vertical-align: top;">
                <a href="https://plus.google.com/+Designmodo/posts"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-googleplus.png">
                </a>
                </td>
                </tr>
                </tbody>
                </table>



                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>

                <!-- END FOOTER -->



                </tbody>
                </table>`,
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
                html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">

                <!-- START HEADER/BANNER -->

                <tbody>
                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0">
                <tbody>
                <tr>
                <td align="center" valign="top"
                background="#fff"
                bgcolor="#fff"
                style="background-size:cover; background-position:center;height:400">
                <table class=" col-600"
                width="600"
                height="50"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr>
                <td
                height="40">
                </td>
                </tr>


                <tr>
                <td align="center"
                style="line-height: 0px;">
                <img class="logo"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                src="https://pedidospeed.herokuapp.com/correos/3.png"
                width="150"
                height="auto"
                alt="logo">
                </td>
                </tr>



                <tr>
                <!-- <td align="center"
                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
                PIDESPEED
                <span
                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 7px;">C.A</span>
                </td> -->
                </tr>





                <tr>
                <!-- <td align="center"
                style="font-family:
                'Lato',
                sans-serif;
                padding:
                20px;
                font-size:15px;
                color:#ffffff;
                line-height:24px;
                font-weight:
                300;">

                Te
                damos
                la
                bienvenida
                a
                nuestra
                plataforma,
                con
                el
                fin
                de
                que
                puedar
                realizar
                pedidos
                a
                tus
                restaurantes
                y
                tiendas
                favoritas
                desde
                la
                comodidad
                de
                tu
                casa,
                oficina
                o
                donde
                te
                encuentres!

                </td> -->
                </tr>


                <tr>
                <td
                height="50">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END HEADER/BANNER -->


                <!-- START 3 BOX SHOWCASE -->

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td height="35"></td>
                </tr>

                <tr>
                <td class="gridMovilTitle"
                align="center" style="font-family: 'Raleway',
                sans-serif; font-size:28px;
                font-weight: bold;
                color:#2f2f2f;">
                ${nombre}!
                </td>
                </tr>

                <tr>
                <td height="10"></td>
                </tr>


                <tr>
                <td class="gridMovilText" align="center"
                style="font-family: 'Lato',
                sans-serif; font-size:18px;
                color:#4d4d4d;
                line-height:24px; font-weight:
                300; padding: 20px;">
                Haz click en el siguiente boton para
                activar tu cuenta y disfrutar
                de todos nuestros
                servicios!
                <br>

                </td>
                </tr>

                </tbody>
                </table>
                </td>
                </tr>

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; ">
                <tbody>
                <tr>
                <td height="10"></td>
                </tr>
                <tr>

                </tr>
                </tbody>
                </table>
                </td>
                </tr>

                <tr>
                <td height="30px"></td>
                </tr>


                <!-- END 3 BOX SHOWCASE -->


                <!-- START AWESOME TITLE -->

                <tr>
                <td align="center">
                <table align="center" class="col-600" width="600" border="0"
                cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                <td align="center" bgcolor="#f7f7f7">
                <table class="col-600"
                width="600"
                align="center"
                border="0"
                cellspacing="0"
                cellpadding="0">
                <tbody>
                <tr>
                <td
                height="33">
                </td>
                </tr>
                <tr>
                <td>


                <table class="col1"
                width="183"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr>
                <td
                height="18">
                </td>
                </tr>

                <tr>
                <td
                align="center">
                <img class="gridMovilImg"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                class="images_style"
                src="https://pedidospeed.herokuapp.com/correos/confirmed.png"
                alt="img"
                width="156"
                height="136">
                </td>



                </tr>
                </tbody>
                </table>



                <table class="col3_one"
                width="380"
                border="0"
                align="right"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr align="left"
                valign="top">
                <td class="gridMovilText"
                style="font-family:
                'Raleway',
                sans-serif;
                text-align:
                center;
                font-size:20px;
                color:#ff3e4c;
                line-height:30px;
                font-weight:
                bold;">
                Haz click aqui:
                </td>
                </tr>


                <tr>
                <td
                height="50px">
                </td>
                </tr>


                <tr align="left"
                valign="top">
                <td style="text-align: center;">
                <a href="http://pidespeed.com/${link}" style="font-family:
                'Lato',
                sans-serif;
                font-size:25px;
                background-color:#ff3e4c;
                color:#ffffff;
                padding:10px;
                font-weight:
                bold; text-align: center;
                text-decoration:none;">Verificar</a>
                </td>
                </tr>

                <tr>
                <td
                height="10">
                </td>
                </tr>

                <tr align="left"
                valign="top">
                <td>
                <!-- <table class="button"
                style="border: 2px solid #fff;"
                bgcolor="#2b3c4d"
                width="200px"
                height="48px"
                border="0"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                width="10">
                </td>
                <td height="30"
                align="center"
                style="font-family: 'Open Sans', Arial, sans-serif; font-size:16px; color:#ffffff;">
                <a href="#"
                style="color:#ffffff;">Confirmar
                tu
                cuenta</a>
                </td>
                <td
                width="10">
                </td>
                </tr>
                </tbody>
                </table> -->
                </td>
                </tr>

                </tbody>
                </table>
                </td>
                </tr>
                <tr>
                <td
                height="33">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END AWESOME TITLE -->


                <!-- START WHAT WE DO -->

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="margin-left:20px; margin-right:20px;">



                <tbody>
                <tr>
                <td align="center">
                <table class="col-600 tableMovil"
                width="600"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td
                height="50">
                </td>
                </tr>
                <tr>
                <td class="gridMovil"
                align="right">


                <table class="col2 tableMovil"
                width="287"
                border="0"
                align="right"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td align="center"
                style="line-height:0px;">
                <img class="gridMovilImgBig"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                class="images_style"
                src="https://pedidospeed.herokuapp.com/correos/chat.png"
                width="169"
                height="138">
                </td>
                </tr>
                </tbody>
                </table>






                <table class="tableMovil"
                width="287"
                border="0"
                align="left"
                cellpadding="0"
                cellspacing="0"
                class="col2"
                style="">
                <tbody>
                <tr>
                <td
                align="center">
                <table class="insider tableMovil"
                width="237"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">



                <tbody>
                <tr
                align="left">
                <td class="gridMovilTitle"
                style="font-family: 'Raleway', sans-serif; font-size:23px; color:#2a3b4c; line-height:30px; font-weight: bold;">
                ¿Necesitas
                ayuda?
                </td>
                </tr>

                <tr>
                <td
                height="5">
                </td>
                </tr>


                <tr>
                <td class="gridMovilText"
                style="font-family: 'Lato', sans-serif; font-size:15px; color:#7f8c8d; line-height:24px; font-weight: 300;">


                Cualquier
                inconveniente
                puedes
                contactarnos
                a
                través
                de
                <a style="color: #ff3e4c; text-decoration: none; font-weight: bold;"
                href="">Ayuda
                en
                línea</a>,
                en
                nuestras
                redes
                sociales,
                o
                ir
                a
                nuestra
                sección
                de
                <a style="color: #ff3e4c; text-decoration: none; font-weight: bold;"
                href="">preguntas
                frecuentes.</a>
                </td>
                </tr>


                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>


                <!-- END WHAT WE DO -->









                <!-- START FOOTER -->

                <tr>
                <td align="center">
                <table align="center"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <tr>
                <td
                height="50">
                </td>
                </tr>
                <tr>
                <td align="center"
                style="
                background-size:
                cover;
                background-position:
                center;" bgcolor="#34495e"
                background="https://pedidospeed.herokuapp.com/correos/meeting5.jpg"
                height="185">
                <table class="col-600"
                width="600"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">
                <tbody>
                <tr>
                <td
                height="25">
                </td>
                </tr>

                <tr>
                <td align="center"
                style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#ffffff;">
                Siguenos
                en
                nuestras
                redes
                sociales!
                </td>
                </tr>


                <tr>
                <td
                height="25">
                </td>
                </tr>



                </tbody>
                </table>
                <table align="center"
                width="35%"
                border="0"
                cellspacing="0"
                cellpadding="0">
                <tbody>
                <tr>
                <td align="center"
                width="30%"
                style="vertical-align: top;">
                <a href="https://www.facebook.com/designmodo"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-fb.png">
                </a>
                </td>

                <td align="center"
                class="margin"
                width="30%"
                style="vertical-align: top;">
                <a href="https://twitter.com/designmodo"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-twitter.png">
                </a>
                </td>

                <td align="center"
                width="30%"
                style="vertical-align: top;">
                <a href="https://plus.google.com/+Designmodo/posts"
                target="_blank">
                <img
                src="https://designmodo.com/demo/emailtemplate/images/icon-googleplus.png">
                </a>
                </td>
                </tr>
                </tbody>
                </table>



                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>

                <!-- END FOOTER -->

                </tbody>
                </table>`,
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
const productosController = new ProductosController;
exports.default = productosController;
