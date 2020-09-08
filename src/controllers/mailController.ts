import { Request, Response } from 'express';
var nodemailer = require('nodemailer');

class MailController{
    
    public async mailCambio(req: Request, res: Response): Promise<void> {
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
            to: nombre +'<'+email+'>',
            subject: subject,
            //text: 'Hello to myself!',
            html:
            `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
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
        try{
            let info = await transporter.sendMail(message);
            res.json({message:"ok"});
        }catch(err){
            //res.status(400).json(err);
            console.log(err)
        }
    }
    
    public async mailEstadoPedido(req: Request, res: Response): Promise<void> {
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
            to: nombre +'<'+email+'>',
            subject: 'Actualización de su pedido',
            //text: 'Hello to myself!',
            html:
            `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
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
        try{
            let info = await transporter.sendMail(message);
            res.json({message:"ok"});
        }catch(err){
            //res.status(400).json(err);
            console.log(err)
        }
    }
    
    public async mailPedidoListo(req: Request, res: Response): Promise<void> {
        let nombre = req.body.nombre;
        let nombreEmpresa = req.body.nombreEmpresa;
        let email = req.body.email;
        let codigo = req.body.codigo;
        let coordenadas = req.body.coordenadas;
        
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
        let message;
        if(coordenadas != 'no'){
            message = {
                from: 'PideSpeed <Pidespeed@gmail.com>',
                to: nombre +'<'+email+'>',
                subject: 'Pedido Terminado',
                //text: 'Hello to myself!',
                html:
                `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
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
                <small style="display: block;">Para ver la dirección en Google Maps haz click en el siguiente botón</small>
                <a href="https://maps.google.com/?q=${coordenadas}" style="
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
                text-decoration: none;">Ver en Google Maps</a>
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
        }else{
            message = {
                from: 'PideSpeed <Pidespeed@gmail.com>',
                to: nombre +'<'+email+'>',
                subject: 'Pedido Terminado',
                //text: 'Hello to myself!',
                html:
                `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
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
        }
        try{
            let info = await transporter.sendMail(message);
            res.json({message:"ok"});
        }catch(err){
            //res.status(400).json(err);
            console.log(err)
        }
    }
    
    public async mailNuevoPedido(req: Request, res: Response): Promise<void> {
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
            to: nombre +'<'+email+'>',
            subject: 'Nuevo Pedido',
            //text: 'Hello to myself!',
            html:
            `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
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
        try{
            let info = await transporter.sendMail(message);
            res.json({message:"ok"});
        }catch(err){
            //res.status(400).json(err);
            console.log(err)
        }
    }
    
    /**
    * CORREOS PUBLICOS
    */
    
    public async mailBienvenido(req: Request, res: Response): Promise<void> {
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
            to: nombre +'<'+email+'>',
            subject: 'Bienvenido a Pidespeed',
            //text: 'Hello to myself!',
            html:
            `<head>
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
        try{
            let info = await transporter.sendMail(message);
            res.json({message:"ok"});
        }catch(err){
            //res.status(400).json(err);
            console.log(err)
        }
    }
    
    public async mailRecuperarPass(req: Request, res: Response): Promise<void> {
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
            to: nombre +'<'+email+'>',
            subject: 'Recuperación de Contraseña',
            html:
            `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
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
        try{
            let info = await transporter.sendMail(message);
            res.json({message:"ok"});
        }catch(err){
            //res.status(400).json(err);
            console.log(err)
        }
    }
    
    public async mailVerificacion(req: Request, res: Response): Promise<void> {
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
            to: nombre +'<'+email+'>',
            subject: 'verifique su cuenta de PideSpeed',
            //text: 'Hello to myself!',
            html:
            `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
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
        try{
            let info = await transporter.sendMail(message);
            res.json({message:"ok"});
        }catch(err){
            //res.status(400).json(err);
            console.log(err)
        }
    }
    
    public async mailPromocion (req: Request, res: Response): Promise<void> {
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
            to: nombre +'<'+email+'>',
            subject: '20% de DESCUENTO Para Ti',
            //text: 'Hello to myself!',
            html:
            `<body style="font-family: 'Roboto', sans-serif;  margin:  0 auto;">
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
        try{
            let info = await transporter.sendMail(message);
            res.json({message:"ok"});
        }catch(err){
            //res.status(400).json(err);
            console.log(err)
        }
    }
}
const mailController = new MailController;
export default mailController;