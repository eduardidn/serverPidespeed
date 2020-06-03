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
class SubcategoriasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var subcategorias = yield db_1.default.query('SELECT * FROM subcategorias');
                res.json(subcategorias);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    listEsp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const { tipo } = req.params;
            try {
                if (tipo == 2) {
                    const productos = yield db_1.default.query('SELECT subcategorias.* FROM subcategorias INNER JOIN categorias On categorias.id = subcategorias.categoria_id LEFT JOIN empresas ON empresas.subcategoria_id = subcategorias.id WHERE categorias.ruta = ?', [ruta]);
                    res.json(productos);
                }
                else {
                    const productos = yield db_1.default.query('SELECT subcategorias.* FROM subcategorias INNER JOIN categorias On categorias.id = subcategorias.categoria_id INNER JOIN empresas ON empresas.subcategoria_id = subcategorias.id WHERE categorias.ruta = ? AND subcategorias.publish = 1 AND empresas.publish = 1', [ruta]);
                    res.json(productos);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    listByEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ruta } = req.params;
            const { tipo } = req.params;
            try {
                const productos = yield db_1.default.query('SELECT subcategorias.* FROM subcategorias INNER JOIN empresas ON empresas.subcategoria_id = subcategorias.id WHERE empresas.ruta = ?', [ruta]);
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
            const subcategorias = yield db_1.default.query('SELECT * FROM subcategorias WHERE id = ?', [id]);
            if (subcategorias.length > 0) {
                return res.json(subcategorias[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('INSERT INTO subcategorias set ?', [req.body]);
                res.json({ message: 'ok' });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE subcategorias set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM subcategorias WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const subcategoriasController = new SubcategoriasController;
exports.default = subcategoriasController;
