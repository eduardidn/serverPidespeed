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
class CuentasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var cuentas;
            cuentas = yield db_1.default.query('SELECT * FROM cuentas');
            res.json(cuentas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cuentas = yield db_1.default.query('SELECT * FROM cuentas WHERE id = ?', [id]);
            console.log(cuentas.length);
            if (cuentas.length > 0) {
                return res.json(cuentas[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('INSERT INTO cuentas set ?', [req.body]);
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
            yield db_1.default.query('UPDATE cuentas set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM cuentas WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const cuentasController = new CuentasController;
exports.default = cuentasController;
