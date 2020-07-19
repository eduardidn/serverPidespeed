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
    getByPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE pedido_id = ?', [id]);
            return res.json(empresa_pedido);
        });
    }
    getByEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? ORDER BY id DESC', [id]);
            return res.json(empresa_pedido);
        });
    }
    getByEmpresaByPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eid } = req.params;
            const { pid } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND pedido_id = ?', [eid, pid]);
            return res.json(empresa_pedido);
        });
    }
    getAllPendientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresa_pedido = yield db_1.default.query('SELECT empresa_pedido.*, empresas.nombre as nombreEmpresa, empresas.email as emailEmpresa, empresas.telefono as telefonoEmpresa FROM empresa_pedido INNER JOIN empresas ON empresas.id = empresa_pedido.empresa_id WHERE empresa_pedido.terminado = 0 AND empresa_pedido.entregado = 0 ORDER BY empresa_pedido.fecha ASC');
            return res.json(empresa_pedido);
        });
    }
    getAllTerminados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresa_pedido = yield db_1.default.query('SELECT empresa_pedido.*, empresas.nombre as nombreEmpresa, empresas.email as emailEmpresa, empresas.telefono as telefonoEmpresa, empresas.logo FROM empresa_pedido INNER JOIN empresas ON empresas.id = empresa_pedido.empresa_id WHERE empresa_pedido.terminado = 1 AND empresa_pedido.entregado = 0 ORDER BY empresa_pedido.fecha ASC');
            return res.json(empresa_pedido);
        });
    }
    getPendientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 0 AND entregado = 0 ORDER BY id DESC', [id]);
            return res.json(empresa_pedido);
        });
    }
    getTerminados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 1 AND entregado = 0 ORDER BY fecha ASC', [id]);
            return res.json(empresa_pedido);
        });
    }
    getEntregados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 1 AND entregado = 1 ORDER BY id ASC', [id]);
            return res.json(empresa_pedido);
        });
    }
    getByPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ids } = req.params;
            let id = ids.split(",");
            var empresa_pedido;
            try {
                empresa_pedido = yield db_1.default.query('SELECT * FROM empresa_pedido WHERE id IN (?)', [id]);
            }
            catch (e) {
                console.log(e);
            }
            res.json(empresa_pedido);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('INSERT INTO empresa_pedido set ?', [req.body]);
                res.json({ message: 'ok' });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield db_1.default.query('UPDATE empresa_pedido set ? WHERE id = ?', [req.body, id]);
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
            yield db_1.default.query('DELETE FROM empresa_pedido WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const empresa_pedidoController = new Empresa_pedidoController;
exports.default = empresa_pedidoController;
