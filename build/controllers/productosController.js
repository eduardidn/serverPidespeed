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
class ProductosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const { tipo } = req.params;
            try {
                var productos;
                if (tipo == 1) {
                    productos = yield db_1.default.query('SELECT productos.*FROM productos INNER JOIN empresas ON empresas.id = productos.empresa_id WHERE empresas.ruta = ? AND productos.publish = 1 and productos.cantidad != 0', [ruta]);
                }
                else {
                    productos = yield db_1.default.query('SELECT productos.*FROM productos INNER JOIN empresas ON empresas.id = productos.empresa_id WHERE empresas.ruta = ? and productos.cantidad != 0', [ruta]);
                }
                res.json(productos);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    listCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            try {
                const productos = yield db_1.default.query('SELECT categorias_product.* FROM categorias_product INNER JOIN empresas ON empresas.categoria_id = categorias_product.categoria_id WHERE empresas.ruta = ? AND categorias_product.publish = 1', [ruta]);
                res.json(productos);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    listCatEsp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const { tipo } = req.params;
            try {
                if (tipo != 1) {
                    const productos = yield db_1.default.query('SELECT productos.categoria_product_id, categorias_product.nombre FROM productos INNER JOIN categorias_product On categorias_product.id = productos.categoria_product_id INNER JOIN empresas ON empresas.id = productos.empresa_id WHERE empresas.ruta = ? GROUP BY productos.categoria_product_id', [ruta]);
                    res.json(productos);
                }
                else {
                    const productos = yield db_1.default.query('SELECT productos.categoria_product_id, categorias_product.nombre FROM productos INNER JOIN categorias_product On categorias_product.id = productos.categoria_product_id INNER JOIN empresas ON empresas.id = productos.empresa_id WHERE empresas.ruta = ? AND productos.publish = 1 GROUP BY productos.categoria_product_id', [ruta]);
                    res.json(productos);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    listOneCatEsp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const productos = yield db_1.default.query('SELECT * FROM categorias_product WHERE id = ?', [id]);
                res.json(productos);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productos = yield db_1.default.query('SELECT * FROM productos WHERE id = ?', [id]);
            console.log(productos.length);
            if (productos.length > 0) {
                return res.json(productos[0]);
            }
            res.json({ message: "error" });
        });
    }
    getOneByDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const { descripcion } = req.params;
            const pedidos = yield db_1.default.query('SELECT * FROM productos WHERE nombre = ? AND descripcion = ?,', [nombre, descripcion]);
            console.log(pedidos.length);
            if (pedidos.length > 0) {
                return res.json(pedidos[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('INSERT INTO productos set ?', [req.body]);
                res.json({ message: 'ok', id: result.insertId });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    restarCantidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { cantidad } = req.params;
            const productos = yield db_1.default.query('SELECT cantidad FROM productos WHERE id = ?', [id]);
            if (productos.length > 0) {
                if (productos[0].cantidad != -1) {
                    let valor = productos[0].cantidad;
                    valor = valor - Number(cantidad);
                    yield db_1.default.query('UPDATE productos SET cantidad = ? WHERE id = ?', [valor, id]);
                    return res.json({ message: "ok" });
                }
            }
            res.json({ message: "error" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE productos set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM productos WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
    image64(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let rutaimg = yield db_1.default.query('SELECT img FROM productos WHERE id = ?', [id]);
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
                var userUploadedFeedMessagesLocation = 'build/img/productos/';
                var ruta = 'productos/' + req.body.filename;
                if (!fs.existsSync('build/img/productos/')) {
                    fs.mkdirSync("build/img/productos", 0o766, function (err) {
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
                            yield db_1.default.query('UPDATE productos set img = ? WHERE id = ?', [ruta, id]);
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
const productosController = new ProductosController;
exports.default = productosController;
