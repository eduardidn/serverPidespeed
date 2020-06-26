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
var fs = require('fs');
const functions_1 = __importDefault(require("../functions"));
const db_1 = __importDefault(require("../db"));
class EmpresasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const { ciudad } = req.params;
            if (ciudad) {
                const empresas = yield db_1.default.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1  AND empresas.es_sucursal = 0 AND ciudad = ?', [ruta, ciudad]);
                res.json(empresas);
            }
            else {
                const empresas = yield db_1.default.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1  AND empresas.es_sucursal = 0', [ruta]);
                res.json(empresas);
            }
        });
    }
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { ciudad } = req.params;
            if (ciudad) {
                const empresas = yield db_1.default.query('SELECT empresas.*, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.id = ? AND ciudad = ?', [id, ciudad]);
                res.json(empresas);
            }
            else {
                const empresas = yield db_1.default.query('SELECT empresas.*, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.id = ?', [id]);
                res.json(empresas);
            }
        });
    }
    listHome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.params;
            /* const { ciudad } = req.params;
            if(ciudad){
                if(type == 2){
                    const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE ciudad = ? ORDER BY empresas.visitas DESC',[ciudad]);
                res.json(empresas);
                }else{
                    const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.publish = 1 AND empresas.es_sucursal = 0 AND ciudad = ? ORDER BY empresas.visitas DESC',[ciudad]);
                res.json(empresas);
                }
            }else{ */
            if (type == 2) {
                const empresas = yield db_1.default.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado ORDER BY empresas.visitas DESC');
                res.json(empresas);
            }
            else {
                const empresas = yield db_1.default.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.publish = 1 AND empresas.es_sucursal = 0 ORDER BY empresas.visitas DESC');
                res.json(empresas);
            }
            /* } */
        });
    }
    listPop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const { ciudad } = req.params;
            if (ciudad) {
                const empresas = yield db_1.default.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0 AND ciudad = ? ORDER BY empresas.visitas', [ruta, ciudad]);
                res.json(empresas);
            }
            else {
                const empresas = yield db_1.default.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0 ORDER BY empresas.visitas', [ruta]);
                res.json(empresas);
            }
        });
    }
    listVen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const { ciudad } = req.params;
            if (ciudad) {
                const empresas = yield db_1.default.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0 AND ciudad = ? ORDER BY empresas.ventas', [ruta, ciudad]);
                res.json(empresas);
            }
            else {
                const empresas = yield db_1.default.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0 ORDER BY empresas.ventas', [ruta]);
                res.json(empresas);
            }
        });
    }
    getSucursales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.id, empresas.nombre, empresas.principal FROM empresas WHERE empresas.empresa_id = ?', [id]);
            return res.json(empresas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.*, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.ruta = ? AND empresas.es_sucursal = 0', [ruta]);
            if (empresas.length > 0) {
                return res.json(empresas[0]);
            }
            res.json({ message: "error" });
        });
    }
    getOneById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.*, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.id = ?', [id]);
            console.log(empresas.length);
            if (empresas.length > 0) {
                return res.json(empresas[0]);
            }
            res.json({ message: "error" });
        });
    }
    addVisita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.visitas FROM empresas WHERE ruta = ?', [ruta]);
            if (empresas.length > 0) {
                let valor = empresas[0].visitas;
                valor = valor + 1;
                yield db_1.default.query('UPDATE empresas SEt visitas = ? WHERE ruta = ?', [valor, ruta]);
                return res.json({ message: "ok" });
            }
            res.json({ message: "error" });
        });
    }
    addVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.ventas FROM empresas WHERE ruta = ?', [ruta]);
            if (empresas.length > 0) {
                let valor = empresas[0].ventas;
                valor = valor + 1;
                yield db_1.default.query('UPDATE empresas SEt ventas = ? WHERE ruta = ?', [valor, ruta]);
                return res.json({ message: "ok" });
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                const result = yield db_1.default.query('INSERT INTO empresas set ?', [req.body]);
                res.json({ message: 'ok', id: result.insertId });
            }
            catch (err) {
                console.log(err);
                res.json({ message: 'error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield db_1.default.query('UPDATE empresas set ? WHERE id = ?', [req.body, id]);
                res.json({ message: "ok" });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM empresas WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
    image64(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let rutaimg = yield db_1.default.query('SELECT img FROM empresas WHERE id = ?', [id]);
            if (rutaimg.length > 0) {
                rutaimg = rutaimg[0];
            }
            if (rutaimg.img != "web/default-empresas.jpg") {
                fs.unlink("./build/img/" + rutaimg.img, (err) => {
                    if (err) {
                        console.log("failed to delete local image:" + err);
                    }
                    else {
                        console.log('successfully deleted local image');
                    }
                });
            }
            try {
                var response = {};
                response.type = req.body.filetype;
                response.data = new Buffer(req.body.value, 'base64');
                var imageBuffer = response;
                var userUploadedFeedMessagesLocation = 'build/img/empresas/';
                var ruta = 'empresas/' + req.body.filename;
                if (!fs.existsSync('build/img/empresas/')) {
                    fs.mkdirSync("build/img/empresas", 0o766, function (err) {
                        if (err) {
                            console.log(err);
                            // echo the result back
                            response.send("ERROR! Can't make the directory! \n");
                        }
                    });
                }
                var userUploadedImagePath = userUploadedFeedMessagesLocation + req.body.filename;
                // Save decoded binary image to disk
                try {
                    fs.writeFile(userUploadedImagePath, imageBuffer.data, function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield db_1.default.query('UPDATE empresas set img = ? WHERE id = ?', [ruta, id]);
                            res.json({ message: 'ok' });
                        });
                    });
                }
                catch (error) {
                    res.json({ message: 'error' });
                }
            }
            catch (error) {
                res.json({ message: 'error' });
            }
        });
    }
    logo64(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let rutaimg = yield db_1.default.query('SELECT logo FROM empresas WHERE id = ?', [id]);
            if (rutaimg.length > 0) {
                rutaimg = rutaimg[0];
            }
            if (rutaimg.logo != "web/6.png") {
                fs.unlink("./build/img/" + rutaimg.logo, (err) => {
                    if (err) {
                        console.log("failed to delete local image:" + err);
                    }
                    else {
                        console.log('successfully deleted local image');
                    }
                });
            }
            try {
                var response = {};
                response.type = req.body.filetype;
                response.data = new Buffer(req.body.value, 'base64');
                var imageBuffer = response;
                var userUploadedFeedMessagesLocation = 'build/img/logos/';
                var ruta = 'logos/' + req.body.filename;
                if (!fs.existsSync('build/img/logos/')) {
                    fs.mkdirSync("build/img/logos", 0o766, function (err) {
                        if (err) {
                            console.log(err);
                            // echo the result back
                            response.send("ERROR! Can't make the directory! \n");
                        }
                    });
                }
                var userUploadedImagePath = userUploadedFeedMessagesLocation + req.body.filename;
                // Save decoded binary image to disk
                try {
                    fs.writeFile(userUploadedImagePath, imageBuffer.data, function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield db_1.default.query('UPDATE empresas set logo = ? WHERE id = ?', [ruta, id]);
                            res.json({ message: 'ok' });
                        });
                    });
                }
                catch (error) {
                    res.json({ message: 'error' });
                }
            }
            catch (error) {
                res.json({ message: 'error' });
            }
        });
    }
}
const empresasController = new EmpresasController;
exports.default = empresasController;
