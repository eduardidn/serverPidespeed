"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
//import morgan from 'morgan';
const cors_1 = __importDefault(require("cors"));
const functions_1 = __importDefault(require("./functions"));
//ROUTES
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const testAdminRoutes_1 = __importDefault(require("./routes/testAdminRoutes"));
const empresasRoutes_1 = __importDefault(require("./routes/empresasRoutes"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
const sesionesRoutes_1 = __importDefault(require("./routes/sesionesRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const favoritosRoutes_1 = __importDefault(require("./routes/favoritosRoutes"));
const categoriasRoutes_1 = __importDefault(require("./routes/categoriasRoutes"));
const siropesRoutes_1 = __importDefault(require("./routes/siropesRoutes"));
const toppingsRoutes_1 = __importDefault(require("./routes/toppingsRoutes"));
const bebidasRoutes_1 = __importDefault(require("./routes/bebidasRoutes"));
const adicionalesRoutes_1 = __importDefault(require("./routes/adicionalesRoutes"));
const tamanosRoutes_1 = __importDefault(require("./routes/tamanosRoutes"));
const pedidosRoutes_1 = __importDefault(require("./routes/pedidosRoutes"));
const detallePedidoRoutes_1 = __importDefault(require("./routes/detallePedidoRoutes"));
const empresaPedidoRoutes_1 = __importDefault(require("./routes/empresaPedidoRoutes"));
const acompsRoutes_1 = __importDefault(require("./routes/acompsRoutes"));
const ventasRoutes_1 = __importDefault(require("./routes/ventasRoutes"));
const tipoBebidasRoutes_1 = __importDefault(require("./routes/tipoBebidasRoutes"));
const pagosRoutes_1 = __importDefault(require("./routes/pagosRoutes"));
const mailRoutes_1 = __importDefault(require("./routes/mailRoutes"));
const configRoutes_1 = __importDefault(require("./routes/configRoutes"));
const cuentasRoutes_1 = __importDefault(require("./routes/cuentasRoutes"));
const SaboresRoutes_1 = __importDefault(require("./routes/SaboresRoutes"));
const estadosRoutes_1 = __importDefault(require("./routes/estadosRoutes"));
const ciudadesRoutes_1 = __importDefault(require("./routes/ciudadesRoutes"));
const categoriasProductRoutes_1 = __importDefault(require("./routes/categoriasProductRoutes"));
const subcategoriasRoutes_1 = __importDefault(require("./routes/subcategoriasRoutes"));
const filesRoutes_1 = __importDefault(require("./routes/filesRoutes"));
class Server {
    constructor() {
        process.env.TZ = 'America/Caracas';
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.static('build/img'));
        this.app.use('/img', express_1.default.static('build/img'));
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
        //this.app.use(morgan('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        dotenv_1.default.config();
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/sesiones', sesionesRoutes_1.default);
        this.app.use('/api', functions_1.default.verifyToken, testRoutes_1.default);
        this.app.use('/admin', functions_1.default.verifyTokenAdmin, testAdminRoutes_1.default);
        this.app.use('/api/mail', mailRoutes_1.default);
        this.app.use('/api/empresas', empresasRoutes_1.default);
        this.app.use('/api/productos', productosRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/favoritos', favoritosRoutes_1.default);
        this.app.use('/api/categorias', categoriasRoutes_1.default);
        this.app.use('/api/siropes', siropesRoutes_1.default);
        this.app.use('/api/toppings', toppingsRoutes_1.default);
        this.app.use('/api/bebidas', bebidasRoutes_1.default);
        this.app.use('/api/adicionales', adicionalesRoutes_1.default);
        this.app.use('/api/tamanos', tamanosRoutes_1.default);
        this.app.use('/api/pedidos', pedidosRoutes_1.default);
        this.app.use('/api/detallepedido', detallePedidoRoutes_1.default);
        this.app.use('/api/empresapedido', empresaPedidoRoutes_1.default);
        this.app.use('/api/acomps', acompsRoutes_1.default);
        this.app.use('/api/ventas', ventasRoutes_1.default);
        this.app.use('/api/tipoBebidas', tipoBebidasRoutes_1.default);
        this.app.use('/api/pagos', pagosRoutes_1.default);
        this.app.use('/api/config', configRoutes_1.default);
        this.app.use('/api/cuentas', cuentasRoutes_1.default);
        this.app.use('/api/sabores', SaboresRoutes_1.default);
        this.app.use('/api/ciudades', ciudadesRoutes_1.default);
        this.app.use('/api/estados', estadosRoutes_1.default);
        this.app.use('/api/categoriasProduct', categoriasProductRoutes_1.default);
        this.app.use('/api/subcategorias', subcategoriasRoutes_1.default);
        this.app.use('/api/files', filesRoutes_1.default);
    }
    //help
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
