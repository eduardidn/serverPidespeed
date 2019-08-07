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
class Empresa_pedidoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido');
                res.json(empresa_pedido);
            }
            catch (e) {
                res.json(e);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE id = ?', [id]);
            if (empresa_pedido.length > 0) {
                return res.json(empresa_pedido[0]);
            }
            res.json({ message: "error" });
        });
    }
    getPendientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 1 AND entregado = 0', [id]);
            if (empresa_pedido.length > 0) {
                return res.json(empresa_pedido[0]);
            }
            res.json({ message: "error" });
        });
    }
    getTerminados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 1 AND entregado = 0', [id]);
            if (empresa_pedido.length > 0) {
                return res.json(empresa_pedido[0]);
            }
            res.json({ message: "error" });
        });
    }
    getEntregados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 1 AND entregado = 1', [id]);
            if (empresa_pedido.length > 0) {
                return res.json(empresa_pedido[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO empresa_pedido set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE empresa_pedido set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM empresa_pedido WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const empresa_pedidoController = new Empresa_pedidoController;
exports.default = empresa_pedidoController;
