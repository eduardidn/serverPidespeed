"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
//import morgan from 'morgan';
const cors_1 = __importDefault(require("cors"));
const functions_1 = __importDefault(require("./functions"));
//funciones
const tasaFunc_1 = __importDefault(require("./tasaFunc"));
//ROUTES
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const empresasRoutes_1 = require("./routes/empresasRoutes");
const productosRoutes_1 = require("./routes/productosRoutes");
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const usuariosRoutes_1 = require("./routes/usuariosRoutes");
const favoritosRoutes_1 = __importDefault(require("./routes/favoritosRoutes"));
const categoriasRoutes_1 = require("./routes/categoriasRoutes");
const siropesRoutes_1 = require("./routes/siropesRoutes");
const toppingsRoutes_1 = require("./routes/toppingsRoutes");
const bebidasRoutes_1 = require("./routes/bebidasRoutes");
const adicionalesRoutes_1 = require("./routes/adicionalesRoutes");
const tamanosRoutes_1 = require("./routes/tamanosRoutes");
const pedidosRoutes_1 = __importDefault(require("./routes/pedidosRoutes"));
const detallePedidoRoutes_1 = __importDefault(require("./routes/detallePedidoRoutes"));
const empresaPedidoRoutes_1 = __importDefault(require("./routes/empresaPedidoRoutes"));
const acompsRoutes_1 = require("./routes/acompsRoutes");
const ventasRoutes_1 = __importDefault(require("./routes/ventasRoutes"));
const tipoBebidasRoutes_1 = require("./routes/tipoBebidasRoutes");
const pagosRoutes_1 = __importDefault(require("./routes/pagosRoutes"));
const mailRoutes_1 = require("./routes/mailRoutes");
const configRoutes_1 = require("./routes/configRoutes");
const cuentasRoutes_1 = require("./routes/cuentasRoutes");
const SaboresRoutes_1 = require("./routes/SaboresRoutes");
const estadosRoutes_1 = require("./routes/estadosRoutes");
const ciudadesRoutes_1 = require("./routes/ciudadesRoutes");
const categoriasProductRoutes_1 = require("./routes/categoriasProductRoutes");
const subcategoriasRoutes_1 = require("./routes/subcategoriasRoutes");
const filesRoutes_1 = __importDefault(require("./routes/filesRoutes"));
const zonasRoutes_1 = require("./routes/zonasRoutes");
const faqRoutes_1 = require("./routes/faqRoutes");
const socketIO = require('socket.io');
class Server {
    constructor() {
        this.notificationsUser = [];
        this.notificationsEmpresas = [];
        if (process.env.NODE_ENV != 'production') {
            dotenv_1.default.config();
        }
        console.log(process.env.USER_DB);
        process.env.TZ = 'America/Caracas';
        this.app = express_1.default();
        this.config();
        this.routes();
        tasaFunc_1.default;
    }
    config() {
        //ruta estatica
        this.app.use(express_1.default.static('build/img'));
        this.app.use('/img', express_1.default.static('build/img'));
        //seguridad
        this.app.use(helmet_1.default());
        //puerto
        this.app.set('port', process.env.PORT || 3000);
        //configuracion de peticiones
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        dotenv_1.default.config();
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/sesiones', loginRoutes_1.default);
        //RUTAS DE VERIFICACIÓN
        this.app.use('/api', functions_1.default.verifyToken, testRoutes_1.default);
        this.app.use('/admin', functions_1.default.verifyTokenAdmin, testRoutes_1.default);
        this.app.use('/empresas', functions_1.default.verifyTokenEmpresa, testRoutes_1.default);
        //RUTAS RESTRINGIDAS
        this.app.use('/api/mail', mailRoutes_1.mailRoutes);
        this.app.use('/api/empresas', empresasRoutes_1.empresasRoutes);
        this.app.use('/api/productos', productosRoutes_1.productosRoutes);
        this.app.use('/api/usuarios', usuariosRoutes_1.usuariosRoutes);
        this.app.use('/api/favoritos', favoritosRoutes_1.default);
        this.app.use('/api/categorias', categoriasRoutes_1.categoriasRoutes);
        this.app.use('/api/siropes', siropesRoutes_1.siropesRoutes);
        this.app.use('/api/toppings', toppingsRoutes_1.toppingsRoutes);
        this.app.use('/api/bebidas', bebidasRoutes_1.bebidasRoutes);
        this.app.use('/api/adicionales', adicionalesRoutes_1.adicionalesRoutes);
        this.app.use('/api/tamanos', tamanosRoutes_1.tamanosRoutes);
        this.app.use('/api/pedidos', pedidosRoutes_1.default);
        this.app.use('/api/detallepedido', detallePedidoRoutes_1.default);
        this.app.use('/api/empresapedido', empresaPedidoRoutes_1.default);
        this.app.use('/api/acomps', acompsRoutes_1.acompsRoutes);
        this.app.use('/api/ventas', ventasRoutes_1.default);
        this.app.use('/api/tipoBebidas', tipoBebidasRoutes_1.tipoBebidasRoutes);
        this.app.use('/api/pagos', pagosRoutes_1.default);
        this.app.use('/api/config', configRoutes_1.configRoutes);
        this.app.use('/api/cuentas', cuentasRoutes_1.cuentasRoutes);
        this.app.use('/api/sabores', SaboresRoutes_1.saboresRoutes);
        this.app.use('/api/ciudades', ciudadesRoutes_1.ciudadesRoutes);
        this.app.use('/api/estados', estadosRoutes_1.estadosRoutes);
        this.app.use('/api/categoriasProduct', categoriasProductRoutes_1.categoriasProductRoutes);
        this.app.use('/api/subcategorias', subcategoriasRoutes_1.subcategoriasRoutes);
        this.app.use('/api/files', filesRoutes_1.default);
        this.app.use('/api/zonas', zonasRoutes_1.zonasRoutes);
        this.app.use('/api/faq', faqRoutes_1.faqRoutes);
        //RUTAS PÚBLICAS
        this.app.use('/public/mail', mailRoutes_1.publicMailRoutes);
        this.app.use('/public/empresas', empresasRoutes_1.publicEmpresasRoutes);
        this.app.use('/public/productos', productosRoutes_1.publicProductosRoutes);
        this.app.use('/public/usuarios', usuariosRoutes_1.publicUsuariosRoutes);
        this.app.use('/public/categorias', categoriasRoutes_1.publicCategoriasRoutes);
        this.app.use('/public/siropes', siropesRoutes_1.publicSiropesRoutes);
        this.app.use('/public/toppings', toppingsRoutes_1.publicToppingsRoutes);
        this.app.use('/public/bebidas', bebidasRoutes_1.publicBebidasRoutes);
        this.app.use('/public/adicionales', adicionalesRoutes_1.publicAdicionalesRoutes);
        this.app.use('/public/tamanos', tamanosRoutes_1.publicTamanosRoutes);
        this.app.use('/public/acomps', acompsRoutes_1.publicAcompsRoutes);
        this.app.use('/public/tipoBebidas', tipoBebidasRoutes_1.publicTipoBebidasRoutes);
        this.app.use('/public/config', configRoutes_1.publicConfigRoutes);
        this.app.use('/public/cuentas', cuentasRoutes_1.publicCuentasRoutes);
        this.app.use('/public/sabores', SaboresRoutes_1.publicSaboresRoutes);
        this.app.use('/public/ciudades', ciudadesRoutes_1.publicCiudadesRoutes);
        this.app.use('/public/estados', estadosRoutes_1.publicEstadosRoutes);
        this.app.use('/public/categoriasProduct', categoriasProductRoutes_1.publicCategoriasProductRoutes);
        this.app.use('/public/subcategorias', subcategoriasRoutes_1.publicSubcategoriasRoutes);
        this.app.use('/public/zonas', zonasRoutes_1.publicZonasRoutes);
        this.app.use('/public/faq', faqRoutes_1.publicFaqRoutes);
        this.app.use('/public/login', loginRoutes_1.default);
    }
    start() {
        const server = this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
        this.io = socketIO(server);
        this.socket();
    }
    socket() {
        this.io.on('connection', (socket) => {
            console.log('new connection', socket.id);
            //verificar notificaciones de usuarios no entregadas
            this.notificationsUser.map((item) => {
                if (item.event) {
                    this.io.sockets.emit(item.event, item.data);
                }
            });
            //verificar notificaciones de empresas no entregadas
            this.notificationsEmpresas.map((item) => {
                if (item.event) {
                    this.io.sockets.emit(item.event, item.data);
                }
            });
            //socket de pedidos
            socket.on('pedido:actualizado', (data) => {
                this.io.sockets.emit('pedido:actualizado', data);
                this.notificationsUser[data.userId] = {
                    event: 'pedido:actualizado',
                    data: data
                };
            });
            socket.on('pedido:nuevoEmpresa', (data) => {
                this.io.sockets.emit('pedido:nuevoEmpresa', data);
                this.notificationsEmpresas[data.empresasId] = {
                    event: 'pedido:actualizado',
                    data: data
                };
            });
            socket.on('pedido:nuevo', (data) => {
                this.io.sockets.emit('pedido:nuevo', data);
            });
            socket.on('actualizar:pedidos', (data) => {
                socket.broadcast.emit('actualizar:pedidos', data);
            });
            socket.on('actualizar:pedidosEmpresa', (data) => {
                socket.broadcast.emit('actualizar:pedidosEmpresa', data);
            });
            //BORRAR NOTIFICACIONES CUANDO YA HAN SIDO VISTAS
            socket.on('notificacion:usuario', (data) => {
                this.notificationsUser[data.userId] = {
                    event: ""
                };
            });
            socket.on('notificacion:empresa', (data) => {
                this.notificationsEmpresas[data.empresasId] = {
                    event: ""
                };
            });
        });
    }
}
const server = new Server();
server.start();
