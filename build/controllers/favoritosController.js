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
class FavoritosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const favoritos = yield db_1.default.query('SELECT empresas.nombre, empresas.horarios, empresas.id, empresas.descripcion,empresas.img,empresas.ruta, categorias.ruta as rutaCategoria from favoritos INNER JOIN empresas on empresas.id = favoritos.empresa_id INNER JOIN categorias ON empresas.categoria_id = categorias.id  WHERE favoritos.usuario_id = ? AND empresas.publish = 1', [id]);
            res.json(favoritos);
        });
    }
    listEsp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { ruta } = req.params;
            const favoritos = yield db_1.default.query('SELECT empresas.nombre, empresas.horarios, empresas.id, empresas.descripcion,empresas.img, categorias.ruta from favoritos INNER JOIN empresas on empresas.id = favoritos.empresa_id INNER JOIN categorias ON empresas.categoria_id = categorias.id  WHERE favoritos.usuario_id = ? AND categorias.ruta = ? AND empresas.publish = 1', [id, ruta]);
            res.json(favoritos);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO favoritos set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM favoritos WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const favoritosController = new FavoritosController;
exports.default = favoritosController;
