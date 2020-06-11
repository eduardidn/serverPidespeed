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
var fs = require('fs');
class PedidosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidos = yield db_1.default.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id ORDER BY pedidos.id DESC');
            res.json(pedidos);
        });
    }
    listAprobar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidos = yield db_1.default.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.aprobado = 0 AND pedidos.cancelado = 0 ORDER BY pedidos.id DESC');
            res.json(pedidos);
        });
    }
    listTerminados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidos = yield db_1.default.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.aprobado = 1 AND pedidos.terminado = 1 ORDER BY pedidos.id DESC');
            res.json(pedidos);
        });
    }
    listCancelados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidos = yield db_1.default.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.cancelado = 1 ORDER BY pedidos.id DESC');
            res.json(pedidos);
        });
    }
    listUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedidos = yield db_1.default.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.usuario_id = ? ORDER BY pedidos.id DESC', [id]);
            res.json(pedidos);
        });
    }
    getByPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ids } = req.params;
            let id = ids.split(",");
            var tamanos;
            try {
                tamanos = yield db_1.default.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.id IN (?)', [id]);
            }
            catch (e) {
                console.log(e);
                res.json({ e });
            }
            res.json(tamanos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedidos = yield db_1.default.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.id = ?', [id]);
            console.log(pedidos.length);
            if (pedidos.length > 0) {
                return res.json(pedidos[0]);
            }
            res.json({ message: "error" });
        });
    }
    getOneByDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigo } = req.params;
            const { precio } = req.params;
            const pedidos = yield db_1.default.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.codigo = ? AND pedidos.precio = ?,', [codigo, precio]);
            console.log(pedidos.length);
            if (pedidos.length > 0) {
                return res.json(pedidos[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO pedidos set ?', [req.body]);
            res.json({ message: 'ok', id: result.insertId });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE pedidos set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM pedidos WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const pedidosController = new PedidosController;
exports.default = pedidosController;
