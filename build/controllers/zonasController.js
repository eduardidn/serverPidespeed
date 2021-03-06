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
class ZonasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ciudad } = req.params;
            var zonas;
            zonas = yield db_1.default.query('SELECT * FROM zonas WHERE ciudad_id = ? ORDER BY nombre ASC', [ciudad]);
            res.json(zonas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const zonas = yield db_1.default.query('SELECT * FROM zonas WHERE id = ?', [id]);
            console.log(zonas.length);
            if (zonas.length > 0) {
                return res.json(zonas[0]);
            }
            res.json({ message: "error" });
        });
    }
    getByIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { ids } = req.params;
                let id = ids.split(",");
                var zonas;
                try {
                    zonas = yield db_1.default.query('SELECT zonas.* FROM zonas WHERE zonas.id IN (?)', [id]);
                }
                catch (e) {
                    console.log(e);
                }
                res.json(zonas);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO zonas set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE zonas set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM zonas WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const zonasController = new ZonasController;
exports.default = zonasController;
