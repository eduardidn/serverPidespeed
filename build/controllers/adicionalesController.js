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
            const adicionales = yield db_1.default.query('SELECT * FROM adicionales WHERE empresa_id = ? AND publish = 1', [id]);
            res.json(adicionales);
        });
    }
    listAny(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let { tabla } = req.params;
            tabla = tabla.replace(/['"]/g, "");
            const adicionales = yield db_1.default.query('SELECT * FROM ? WHERE empresa_id = ? AND publish = 1', [tabla, id]);
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
