"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//ROUTES
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const empresasRoutes_1 = __importDefault(require("./routes/empresasRoutes"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
const sesionesRoutes_1 = __importDefault(require("./routes/sesionesRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const favoritosRoutes_1 = __importDefault(require("./routes/favoritosRoutes"));
const categoriasRoutes_1 = __importDefault(require("./routes/categoriasRoutes"));
const siropesRoutes_1 = __importDefault(require("./routes/siropesRoutes"));
const toppingsRoutes_1 = __importDefault(require("./routes/toppingsRoutes"));
const refrescosRoutes_1 = __importDefault(require("./routes/refrescosRoutes"));
const adicionalesRoutes_1 = __importDefault(require("./routes/adicionalesRoutes"));
const tamanosRoutes_1 = __importDefault(require("./routes/tamanosRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        //this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default({ origin: 'http://localhost:4200' }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/sesiones', sesionesRoutes_1.default);
        //this.app.use('/api',func.verifyToken, testRoutes);
        this.app.use('/api/empresas', empresasRoutes_1.default);
        this.app.use('/api/productos', productosRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/favoritos', favoritosRoutes_1.default);
        this.app.use('/api/categorias', categoriasRoutes_1.default);
        this.app.use('/api/siropes', siropesRoutes_1.default);
        this.app.use('/api/toppings', toppingsRoutes_1.default);
        this.app.use('/api/refrescos', refrescosRoutes_1.default);
        this.app.use('/api/adicionales', adicionalesRoutes_1.default);
        this.app.use('/api/tamanos', tamanosRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
