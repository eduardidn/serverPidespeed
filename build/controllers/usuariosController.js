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
var fs = require('fs');
const db_1 = __importDefault(require("../db"));
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield db_1.default.query('SELECT * FROM usuarios');
            res.json(usuarios);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuarios = yield db_1.default.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            console.log(usuarios.length);
            if (usuarios.length > 0) {
                return res.json(usuarios[0]);
            }
            res.json({ message: "error" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const { id } = req.params;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                yield db_1.default.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.json({ message: "errorBD" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM usuarios WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
    image64(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                var response = {};
                response.type = req.body.filetype;
                response.data = new Buffer(req.body.value, 'base64');
                var imageBuffer = response;
                var userUploadedFeedMessagesLocation = 'build/img/usuarios/';
                var ruta = 'usuarios/' + req.body.filename;
                var userUploadedImagePath = userUploadedFeedMessagesLocation + req.body.filename;
                // Save decoded binary image to disk
                try {
                    fs.writeFile(userUploadedImagePath, imageBuffer.data, function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            let rutaimg = yield db_1.default.query('SELECT img FROM usuarios WHERE id = ?', [id]);
                            if (rutaimg.length > 0) {
                                rutaimg = rutaimg[0];
                            }
                            fs.unlink("./build/img/" + rutaimg.img, (err) => {
                                if (err) {
                                    console.log("failed to delete local image:" + err);
                                }
                                else {
                                    console.log('successfully deleted local image');
                                }
                            });
                            yield db_1.default.query('UPDATE usuarios set img = ? WHERE id = ?', [ruta, id]);
                            res.json({ message: 'ok' });
                        });
                    });
                }
                catch (error) {
                    res.json({ message: 'error' });
                }
            }
            catch (error) {
                res.json({ message: 'error' });
            }
        });
    }
}
const usuariosController = new UsuariosController;
exports.default = usuariosController;
