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
class SaboresController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tipo } = req.params;
            var sabores;
            if (tipo == 1) {
                sabores = yield db_1.default.query('SELECT * FROM sabores WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
            }
            else {
                sabores = yield db_1.default.query('SELECT * FROM sabores WHERE empresa_id = ?', [id]);
            }
            res.json(sabores);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sabores = yield db_1.default.query('SELECT * FROM sabores WHERE id = ?', [id]);
            if (sabores.length > 0) {
                return res.json(sabores[0]);
            }
            res.json({ message: "error" });
        });
    }
    updateByIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ids } = req.params;
            let id = ids.split(",");
            try {
                const sabores = yield db_1.default.query('UPDATE sabores set ? WHERE id IN (?)', [req.body, id]);
                res.json({ message: "ok" });
            }
            catch (err) {
                console.log(err);
                res.json({ message: "error" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO sabores set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE sabores set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM sabores WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const saboresController = new SaboresController;
exports.default = saboresController;
