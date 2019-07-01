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
const db_1 = __importDefault(require("../db"));
class ProductosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            try {
                const productos = yield db_1.default.query('SELECT productos.*FROM productos INNER JOIN empresas ON empresas.id = productos.empresa_id WHERE empresas.ruta = ? AND productos.publish = 1', [ruta]);
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
            try {
                const productos = yield db_1.default.query('SELECT productos.categoria_product_id FROM productos INNER JOIN categorias_product On categorias_product.id = productos.categoria_product_id INNER JOIN empresas ON empresas.id = productos.empresa_id WHERE empresas.ruta = ? AND productos.publish = 1 GROUP BY productos.categoria_product_id', [ruta]);
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO productos set ?', [req.body]);
            res.json({ message: 'ok' });
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
}
const productosController = new ProductosController;
exports.default = productosController;
