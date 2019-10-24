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
    mailCambiarPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
            let codigo = req.body.link;
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
                Acabas de solicitar el cambio
                de
                de tu contraseña,
                intoduce el siguiente codigo
                para poder actualizar tu
                contraseña!
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
    mailEstadoPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let nombre = req.body.nombre;
            let email = req.body.email;
            let codigo = req.body.codigo;
            let contenido = req.body.contenido;
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
                subject: 'Actualización de su pedido',
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
                <!-- <td
                height="50">
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


                <!-- END HEADER/BANNER -->


                <!-- START 3 BOX SHOWCASE -->

                <tr>
                <td align="center">
                <table class="col-600" width="600" border="0" align="center"
                cellpadding="0" cellspacing="0"
                style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                <tbody>
                <!-- <tr>
                <td height="35"></td>
                </tr> -->

                <tr>
                <td class="gridMovilTitle"
                align="center" style="font-family: 'Raleway',
                sans-serif; font-size:28px;
                font-weight: bold;
                color:#2f2f2f;">
                Hola!, ${nombre}.
                </td>
                </tr>

                <!-- <tr>
                <td height="10"></td>
                </tr> -->


                <tr>
                <!-- <td class="gridMovilText" align="center"
                style="font-family: 'Lato',
                sans-serif; font-size:18px;
                color:#4d4d4d;
                line-height:24px; font-weight:
                300; padding: 20px;">
                Tu codigo de pedido es:
                <span class="gridMovilText"
                style="border-bottom:
                2px solid #ff3e4c;
                font-size: 22px;
                color:
                #333;">${codigo}</span>
                <br>

                </td> -->
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
                <!-- <td
                height="18">
                </td> -->
                </tr>

                <tr>
                <!-- <td
                align="center">
                <img class="gridMovilImg"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                class="images_style"
                src="https://pedidospeed.herokuapp.com/correos/confirmed.png"
                alt="img"
                width="156"
                height="136">
                </td> -->



                </tr>
                </tbody>
                </table>



                <table class="col3_one"
                width="380"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr align="center"
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
                El
                estado
                de
                tu
                pedido
                <span class="gridMovilText"
                style="border-bottom:
                2px solid #ff3e4c;
                font-size: 22px;
                color:
                #333;">${codigo}</span>
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
                font-size:36px;
                color:#ff3e4c;
                line-height:40px;
                font-weight:
                bold; text-align: center;">
                ${contenido}
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
                <td align="center" style="padding-bottom:
                100px;">
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
    mailNuevoPedido(req, res) {
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
                src="./img/3.png"
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
                <!-- <td
                height="50">
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
                ${nombre}, tienes un nuevo
                pedido!
                </td>
                </tr>

                <!-- <tr>
                <td height="10"></td>
                </tr> -->


                <tr>
                <!-- <td class="gridMovilText" align="center"
                style="font-family: 'Lato',
                sans-serif; font-size:18px;
                color:#4d4d4d;
                line-height:24px; font-weight:
                300; padding: 20px;">
                Tu codigo de pedido es:
                <span class="gridMovilText"
                style="border-bottom:
                2px solid #ff3e4c;
                font-size: 22px;
                color:
                #333;">my54d5s</span>
                <br>

                </td> -->
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
                <!-- <td
                height="18">
                </td> -->
                </tr>

                <tr>
                <!-- <td
                align="center">
                <img class="gridMovilImg"
                style="display:block; line-height:0px; font-size:0px; border:0px;"
                class="images_style"
                src="./img/confirmed.png"
                alt="img"
                width="156"
                height="136">
                </td> -->



                </tr>
                </tbody>
                </table>



                <table class="col3_one tableMovil"
                width="380"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0">

                <tbody>
                <tr align="center"
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
                Para
                revisar
                los
                pedidos
                haz
                click
                en
                el
                siguiente
                enlace


                </td>
                </tr>


                <tr>
                <td
                height="50px">
                </td>
                </tr>


                <tr align="left"
                valign="top">
                <td align="center" ">
                <a class="
                btn"
                href="${link}"
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
                Revisar
                ordenes
                pendientes</a>

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
                <td align="center" style="padding-bottom:
                100px;">
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
                src="./img/chat.png"
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
const mailController = new MailController;
exports.default = mailController;
