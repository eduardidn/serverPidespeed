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
class SiropesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tipo } = req.params;
            var siropes;
            if (tipo == 1) {
                siropes = yield db_1.default.query('SELECT * FROM siropes WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
            }
            else {
                siropes = yield db_1.default.query('SELECT * FROM siropes WHERE empresa_id = ?', [id]);
            }
            res.json(siropes);
        });
    }
    listByIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ids } = req.params;
            const { tipo } = req.params;
            let id = ids.split(",");
            var siropes;
            if (tipo == 2) {
                try {
                    siropes = yield db_1.default.query('SELECT siropes.* FROM siropes WHERE siropes.id IN (?)', [id]);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                siropes = yield db_1.default.query('SELECT siropes.* FROM siropes WHERE siropes.publish = 1 AND siropes.id IN (?)', [id]);
            }
            res.json(siropes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const siropes = yield db_1.default.query('SELECT * FROM siropes WHERE id = ?', [id]);
            console.log(siropes.length);
            if (siropes.length > 0) {
                return res.json(siropes[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO siropes set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE siropes set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM siropes WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const siropesController = new SiropesController;
exports.default = siropesController;
