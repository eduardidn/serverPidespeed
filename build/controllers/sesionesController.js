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
class ProductosController {
    buscarUserEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where email = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    buscarEmpresaEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM empresas Where email = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    buscarUserUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where username = ?', [req.body.user]);
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
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password, verificado FROM usuarios Where email = ? or username = ?', [req.body.user, req.body.user]);
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
    mailRecuperarPass(req, res) {
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
                from: 'Eduardo <eduardidn@gmail.com>',
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
                src="https://pedidospeed.herokuapp.com/correos/confirmed.svg"
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
                src="https://pedidospeed.herokuapp.com/correos/chat.svg"
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
                    user: 'eduardidn@gmail.com',
                    pass: 'vuqzqfrmtasyytla'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: 'Eduardo <eduardidn@gmail.com>',
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
                src="https://pedidospeed.herokuapp.com/correos/compra.svg"
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
                src="https://pedidospeed.herokuapp.com/correos/delivery.svg"
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
                src="https://pedidospeed.herokuapp.com/correos/promotion.svg"
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
                    user: 'eduardidn@gmail.com',
                    pass: 'vuqzqfrmtasyytla'
                },
                logger: true,
                debug: false
            });
            let message = {
                from: 'Eduardo <eduardidn@gmail.com>',
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
                src="https://pedidospeed.herokuapp.com/correos/confirmed.svg"
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
                <a href="http://localhost:4200/${link}" style="font-family:
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
                src="https://pedidospeed.herokuapp.com/correos/chat.svg"
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
