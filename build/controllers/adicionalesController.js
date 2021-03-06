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
class AdicionalesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tipo } = req.params;
            var adicionales;
            if (tipo == 1) {
                adicionales = yield db_1.default.query('SELECT * FROM adicionales WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
            }
            else {
                adicionales = yield db_1.default.query('SELECT * FROM adicionales WHERE empresa_id = ?', [id]);
            }
            res.json(adicionales);
        });
    }
    listByIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ids } = req.params;
            const { tipo } = req.params;
            let id = ids.split(",");
            var adicionales;
            if (tipo == 2) {
                try {
                    adicionales = yield db_1.default.query('SELECT adicionales.* FROM adicionales WHERE adicionales.id IN (?)', [id]);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                adicionales = yield db_1.default.query('SELECT adicionales.* FROM adicionales WHERE adicionales.publish = 1 AND adicionales.id IN (?)', [id]);
            }
            res.json(adicionales);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const adicionales = yield db_1.default.query('SELECT * FROM adicionales WHERE id = ?', [id]);
            console.log(adicionales.length);
            if (adicionales.length > 0) {
                return res.json(adicionales[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO adicionales set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE adicionales set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM adicionales WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const adicionalesController = new AdicionalesController;
exports.default = adicionalesController;
