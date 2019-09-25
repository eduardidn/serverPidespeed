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
const db_1 = __importDefault(require("../db"));
class EmpresasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.id, empresas.horarios, empresas.nombre,empresas.ruta,empresas.descripcion, empresas.img, empresas.logo, empresas.keywords, empresas.categoria_id, categorias.ruta as rutaCategoria FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id WHERE categorias.ruta = ? AND empresas.publish = 1', [ruta]);
            res.json(empresas);
        });
    }
    listHome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.id, empresas.horarios, empresas.nombre,empresas.ruta,empresas.descripcion, empresas.img, empresas.logo, empresas.keywords, empresas.categoria_id, categorias.ruta as rutaCategoria FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id WHERE empresas.publish = 1 ORDER BY empresas.visitas DESC');
            res.json(empresas);
        });
    }
    listPop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.id, empresas.horarios, empresas.nombre,empresas.ruta,empresas.descripcion, empresas.img, empresas.logo, empresas.keywords, empresas.categoria_id, categorias.ruta as rutaCategoria FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id WHERE categorias.ruta = ? AND empresas.publish = 1 ORDER BY empresas.visitas', [ruta]);
            res.json(empresas);
        });
    }
    listVen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const empresas = yield db_1.default.query('SELECT empresas.id, empresas.horarios, empresas.nombre,empresas.ruta,empresas.descripcion, empresas.img, empresas.logo, empresas.keywords, empresas.categoria_id, categorias.ruta as rutaCategoria FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id WHERE categorias.ruta = ? AND empresas.publish = 1 ORDER BY empresas.ventas', [ruta]);
            res.json(empresas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const empresas = yield db_1.default.query('SELECT * FROM empresas WHERE ruta = ?', [ruta]);
            if (empresas.length > 0) {
                return res.json(empresas[0]);
            }
            res.json({ message: "error" });
        });
    }
    getOneById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresas = yield db_1.default.query('SELECT * FROM empresas WHERE id = ?', [id]);
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
            const result = yield db_1.default.query('INSERT INTO empresas set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE empresas set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
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
            fs.unlink("./build/img/" + rutaimg.img, (err) => {
                if (err) {
                    console.log("failed to delete local image:" + err);
                }
                else {
                    console.log('successfully deleted local image');
                }
            });
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
            fs.unlink("./build/img/" + rutaimg.logo, (err) => {
                if (err) {
                    console.log("failed to delete local image:" + err);
                }
                else {
                    console.log('successfully deleted local image');
                }
            });
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
