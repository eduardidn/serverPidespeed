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
const functions_1 = __importDefault(require("../functions"));
const db_1 = __importDefault(require("../db"));
class ProductosController {
    buscarUserEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where email = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    buscarUserUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where username = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                const usuario = yield db_1.default.query('INSERT INTO usuarios SET ?', [req.body]);
                if (usuario.affectedRows == 1) {
                    res.json({ message: "ok" });
                }
                else {
                    res.json({ message: "error" });
                }
            }
            catch (err) {
                res.json({ message: "errorBD" });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where email = ? or username = ?', [req.body.user, req.body.user]);
            if (usuario != "") {
                let savedPassword = usuario[0].password;
                let match = yield functions_1.default.matchPassword(password, savedPassword);
                if (match) {
                    let token = yield functions_1.default.getToken(req.body);
                    res.json({ message: "ok", token: token, user: usuario[0] });
                }
                else {
                    res.json({ message: "error" });
                }
            }
            else {
                res.json({ message: "error" });
            }
        });
    }
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const admin = yield db_1.default.query('SELECT * FROM empresas Where email = ? or username = ?', [req.body.user, req.body.user]);
            if (admin != "") {
                let savedPassword = admin[0].password;
                let match = yield functions_1.default.matchPassword(password, savedPassword);
                if (match) {
                    let token = yield functions_1.default.getToken(req.body);
                    let tokenAdmin = yield functions_1.default.getTokenAdmin(req.body);
                    res.json({ message: "ok", token: token, tokenAdmin: tokenAdmin, user: admin[0] });
                }
                else {
                    res.json({ message: "error" });
                }
            }
            else {
                res.json({ message: "error" });
            }
        });
    }
    createEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*let password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(password, salt);
            req.body.password = passHash;
            const productos = await db.query('INSERT INTO empresas SET ?', [req.body]);
            res.json(productos);*/
        });
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*let password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(password, salt);
            req.body.password = passHash;
            const productos = await db.query('INSERT INTO admins SET ?', [req.body]);
            res.json(productos);*/
        });
    }
    loginEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
const productosController = new ProductosController;
exports.default = productosController;
