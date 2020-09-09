import express, {Application} from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from "dotenv";

//import morgan from 'morgan';
import cors from 'cors'
import func from './functions';

//funciones
import tasaFunc from './tasaFunc';

//ROUTES
import indexRoutes from './routes/indexRoutes';
import testRoutes from './routes/testRoutes';
import {empresasRoutes, publicEmpresasRoutes} from './routes/empresasRoutes';
import {productosRoutes, publicProductosRoutes} from './routes/productosRoutes';
import loginRoutes from './routes/loginRoutes';
import {usuariosRoutes, publicUsuariosRoutes} from './routes/usuariosRoutes';
import favoritosRoutes from './routes/favoritosRoutes';
import {categoriasRoutes, publicCategoriasRoutes} from './routes/categoriasRoutes';
import {siropesRoutes, publicSiropesRoutes} from './routes/siropesRoutes';
import {toppingsRoutes, publicToppingsRoutes} from './routes/toppingsRoutes';
import {bebidasRoutes, publicBebidasRoutes} from './routes/bebidasRoutes';
import {adicionalesRoutes, publicAdicionalesRoutes} from './routes/adicionalesRoutes';
import {tamanosRoutes, publicTamanosRoutes} from './routes/tamanosRoutes';
import pedidosRoutes from './routes/pedidosRoutes';
import detallePedidoRoutes from './routes/detallePedidoRoutes';
import empresaPedidoRoutes from './routes/empresaPedidoRoutes';
import {acompsRoutes, publicAcompsRoutes} from './routes/acompsRoutes';
import ventasRoutes from './routes/ventasRoutes';
import {tipoBebidasRoutes, publicTipoBebidasRoutes} from './routes/tipoBebidasRoutes';
import pagosRoutes from './routes/pagosRoutes';
import {mailRoutes, publicMailRoutes} from './routes/mailRoutes';
import {configRoutes, publicConfigRoutes} from './routes/configRoutes';
import {cuentasRoutes, publicCuentasRoutes} from './routes/cuentasRoutes';
import {saboresRoutes, publicSaboresRoutes} from './routes/SaboresRoutes';
import {estadosRoutes, publicEstadosRoutes} from './routes/estadosRoutes';
import {ciudadesRoutes, publicCiudadesRoutes} from './routes/ciudadesRoutes';
import {categoriasProductRoutes, publicCategoriasProductRoutes} from './routes/categoriasProductRoutes';
import {subcategoriasRoutes, publicSubcategoriasRoutes} from './routes/subcategoriasRoutes';
import filesRoutes from './routes/filesRoutes';
import {zonasRoutes, publicZonasRoutes} from './routes/zonasRoutes';
import {faqRoutes, publicFaqRoutes} from './routes/faqRoutes';

const socketIO = require('socket.io');

class Server {

    public notificationsUser:object[] = [];
    public notificationsEmpresas:object[] = [];
    public app: Application;
    public io: any;
    
    constructor() {
        if(process.env.NODE_ENV != 'production'){
            dotenv.config();
        }
        console.log(process.env.USER_DB)
        process.env.TZ = 'America/Caracas'
        this.app = express();
        this.config();
        this.routes();
        tasaFunc;
    }
    
    config(): void {
        //ruta estatica
        this.app.use(express.static('build/img'));
        this.app.use('/img', express.static('build/img'));
        
        //seguridad
        this.app.use(helmet());

        //puerto
        this.app.set('port', process.env.PORT || 3000);
        
        //configuracion de peticiones
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        dotenv.config();
    }
    
    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/sesiones', loginRoutes);
        //RUTAS DE VERIFICACIÓN
        this.app.use('/api',func.verifyToken, testRoutes);
        this.app.use('/admin',func.verifyTokenAdmin, testRoutes);
        this.app.use('/empresas',func.verifyTokenEmpresa, testRoutes);
        //RUTAS RESTRINGIDAS
        this.app.use('/api/mail', mailRoutes);
        this.app.use('/api/empresas', empresasRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/favoritos', favoritosRoutes);
        this.app.use('/api/categorias', categoriasRoutes);
        this.app.use('/api/siropes', siropesRoutes);
        this.app.use('/api/toppings', toppingsRoutes);
        this.app.use('/api/bebidas', bebidasRoutes);
        this.app.use('/api/adicionales', adicionalesRoutes);
        this.app.use('/api/tamanos', tamanosRoutes);
        this.app.use('/api/pedidos', pedidosRoutes);
        this.app.use('/api/detallepedido', detallePedidoRoutes);
        this.app.use('/api/empresapedido', empresaPedidoRoutes);
        this.app.use('/api/acomps', acompsRoutes);
        this.app.use('/api/ventas', ventasRoutes);
        this.app.use('/api/tipoBebidas', tipoBebidasRoutes);
        this.app.use('/api/pagos', pagosRoutes);
        this.app.use('/api/config', configRoutes);
        this.app.use('/api/cuentas', cuentasRoutes);
        this.app.use('/api/sabores', saboresRoutes);
        this.app.use('/api/ciudades', ciudadesRoutes);
        this.app.use('/api/estados', estadosRoutes);
        this.app.use('/api/categoriasProduct', categoriasProductRoutes);
        this.app.use('/api/subcategorias', subcategoriasRoutes);
        this.app.use('/api/files', filesRoutes);
        this.app.use('/api/zonas', zonasRoutes);
        this.app.use('/api/faq', faqRoutes);
        //RUTAS PÚBLICAS
        this.app.use('/public/mail', publicMailRoutes);
        this.app.use('/public/empresas', publicEmpresasRoutes);
        this.app.use('/public/productos', publicProductosRoutes);
        this.app.use('/public/usuarios', publicUsuariosRoutes);
        this.app.use('/public/categorias', publicCategoriasRoutes);
        this.app.use('/public/siropes', publicSiropesRoutes);
        this.app.use('/public/toppings', publicToppingsRoutes);
        this.app.use('/public/bebidas', publicBebidasRoutes);
        this.app.use('/public/adicionales', publicAdicionalesRoutes);
        this.app.use('/public/tamanos', publicTamanosRoutes);
        this.app.use('/public/acomps', publicAcompsRoutes);
        this.app.use('/public/tipoBebidas', publicTipoBebidasRoutes);
        this.app.use('/public/config', publicConfigRoutes);
        this.app.use('/public/cuentas', publicCuentasRoutes);
        this.app.use('/public/sabores', publicSaboresRoutes);
        this.app.use('/public/ciudades', publicCiudadesRoutes);
        this.app.use('/public/estados', publicEstadosRoutes);
        this.app.use('/public/categoriasProduct', publicCategoriasProductRoutes);
        this.app.use('/public/subcategorias', publicSubcategoriasRoutes);
        this.app.use('/public/zonas', publicZonasRoutes);
        this.app.use('/public/faq', publicFaqRoutes);
        this.app.use('/public/login', loginRoutes);
    }

    start() {
        const server = this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
        this.io = socketIO(server);
        this.socket()
    }

    socket(){
        this.io.on('connection', (socket:any) => {
            console.log('new connection', socket.id);

            //verificar notificaciones de usuarios no entregadas
            this.notificationsUser.map((item:any) => {
                if(item.event){
                    this.io.sockets.emit(item.event, item.data)
                }
            })

            //verificar notificaciones de empresas no entregadas
            this.notificationsEmpresas.map((item:any) => {
                if(item.event){
                    this.io.sockets.emit(item.event, item.data)
                }
            })

            //socket de pedidos
            socket.on('pedido:actualizado', (data:any) => {
                this.io.sockets.emit('pedido:actualizado', data)
                this.notificationsUser[data.userId] = {
                    event: 'pedido:actualizado',
                    data: data
                }
            })
            
            socket.on('pedido:nuevoEmpresa', (data:any) => {
                this.io.sockets.emit('pedido:nuevoEmpresa', data)
                this.notificationsEmpresas[data.empresasId] = {
                    event: 'pedido:actualizado',
                    data: data
                }
            })

            socket.on('pedido:nuevo', (data:any) => {
                this.io.sockets.emit('pedido:nuevo', data)
            })

            socket.on('actualizar:pedidos', (data:any) => {
                socket.broadcast.emit('actualizar:pedidos', data)
            })

            socket.on('actualizar:pedidosEmpresa', (data:any) => {
                socket.broadcast.emit('actualizar:pedidosEmpresa', data)
            })

            //BORRAR NOTIFICACIONES CUANDO YA HAN SIDO VISTAS

            socket.on('notificacion:usuario', (data:any) => {
                this.notificationsUser[data.userId] = {
                    event: ""
                }
            })
            
            socket.on('notificacion:empresa', (data:any) => {
                this.notificationsEmpresas[data.empresasId] = {
                    event: ""
                }
            })
        })
    }

}

const server = new Server();
server.start();