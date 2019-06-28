import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors'
import func from './functions';
//ROUTES
import indexRoutes from './routes/indexRoutes';
import testRoutes from './routes/testRoutes';
import empresasRoutes from './routes/empresasRoutes';
import productosRoutes from './routes/productosRoutes';
import sesionesRoutes from './routes/sesionesRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import favoritosRoutes from './routes/favoritosRoutes';
import categoriasRoutes from './routes/categoriasRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors({origin: 'http://localhost:4200'}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/sesiones', sesionesRoutes);
        //this.app.use('/api',func.verifyToken, testRoutes);
        this.app.use('/api/empresas', empresasRoutes);
        this.app.use('/api/productos', productosRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/favoritos', favoritosRoutes);
        this.app.use('/api/categorias', categoriasRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();