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
class BebidasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tipo } = req.params;
            var bebidas;
            if (tipo == 1) {
                bebidas = yield db_1.default.query('SELECT * FROM bebidas WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
            }
            else {
                bebidas = yield db_1.default.query('SELECT * FROM bebidas WHERE empresa_id = ?', [id]);
            }
            res.json(bebidas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bebidas = yield db_1.default.query('SELECT * FROM bebidas WHERE id = ?', [id]);
            console.log(bebidas.length);
            if (bebidas.length > 0) {
                return res.json(bebidas[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.default.query('INSERT INTO bebidas set ?', [req.body]);
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
            yield db_1.default.query('UPDATE bebidas set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM bebidas WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const bebidasController = new BebidasController;
exports.default = bebidasController;
