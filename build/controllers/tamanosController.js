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
class TamanosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ids } = req.params;
            const { tipo } = req.params;
            let id = ids.split(",");
            var tamanos;
            if (tipo == 1) {
                try {
                    tamanos = yield db_1.default.query('SELECT tamanos.* FROM tamanos WHERE tamanos.publish = 1 AND tamanos.id IN (?) GROUP BY tamanos.nombre', [id]);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                tamanos = yield db_1.default.query('SELECT tamanos.* FROM tamanos WHERE tamanos.id IN (?) GROUP BY tamanos.nombre', [id]);
            }
            res.json(tamanos);
        });
    }
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tamanos = yield db_1.default.query('SELECT * FROM tamanos');
            res.json(tamanos);
        });
    }
    listByEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tamanos = yield db_1.default.query('SELECT * FROM tamanos WHERE empresa_id = ?', [id]);
            res.json(tamanos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tamanos = yield db_1.default.query('SELECT * FROM tamanos WHERE id = ?', [id]);
            console.log(tamanos.length);
            if (tamanos.length > 0) {
                return res.json(tamanos[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO tamanos set ?', [req.body]);
            res.json({ message: 'ok' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE tamanos set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM tamanos WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const tamanosController = new TamanosController;
exports.default = tamanosController;
