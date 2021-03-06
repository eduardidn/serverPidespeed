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
class VentasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ventas = yield db_1.default.query('SELECT * FROM ventas WHERE empresa_id = ?', [id]);
            res.json(ventas);
        });
    }
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ventas = yield db_1.default.query('SELECT * FROM ventas');
            res.json(ventas);
        });
    }
    getNoPagados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ventas = yield db_1.default.query('SELECT * FROM ventas WHERE pagado = 0 AND empresa_id = ?', [id]);
            res.json(ventas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ventas = yield db_1.default.query('SELECT * FROM ventas WHERE id = ?', [id]);
            console.log(ventas.length);
            if (ventas.length > 0) {
                return res.json(ventas[0]);
            }
            res.json({ message: "error" });
        });
    }
    getByPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ids } = req.params;
            let id = ids.split(",");
            var ventas;
            try {
                ventas = yield db_1.default.query('SELECT * FROM ventas WHERE id IN (?)', [id]);
            }
            catch (e) {
                console.log(e);
            }
            res.json(ventas);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO ventas set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE ventas set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM ventas WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const ventasController = new VentasController;
exports.default = ventasController;
