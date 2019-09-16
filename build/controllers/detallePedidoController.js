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
class Detalle_pedidoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const detalle_pedido = yield db_1.default.query('SELECT * FROM detalle_pedido');
            res.json(detalle_pedido);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detalle_pedido = yield db_1.default.query('SELECT * FROM detalle_pedido WHERE id = ?', [id]);
            console.log(detalle_pedido.length);
            if (detalle_pedido.length > 0) {
                return res.json(detalle_pedido[0]);
            }
            res.json({ message: "error" });
        });
    }
    getPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pid } = req.params;
            const { eid } = req.params;
            const detalle_pedido = yield db_1.default.query('SELECT * FROM detalle_pedido WHERE pedido_id = ? AND empresa_id = ?', [pid, eid]);
            return res.json(detalle_pedido);
        });
    }
    getPedidosByPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pid } = req.params;
            const detalle_pedido = yield db_1.default.query('SELECT * FROM detalle_pedido WHERE pedido_id = ? ', [pid]);
            return res.json(detalle_pedido);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('INSERT INTO detalle_pedido set ?', [req.body]);
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
            yield db_1.default.query('UPDATE detalle_pedido set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM detalle_pedido WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const detalle_pedidoController = new Detalle_pedidoController;
exports.default = detalle_pedidoController;
