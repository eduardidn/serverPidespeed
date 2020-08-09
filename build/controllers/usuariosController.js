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
            if (usuarios.length > 0) {
                return res.json(usuarios[0]);
            }
            res.json({ message: "error" });
        });
    }
    /**
    * consultas para hacer el login
    */
    buscarUserEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where email = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    buscarUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT * FROM usuarios Where email = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    buscarUserUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where username = ?', [req.body.user]);
            res.json(usuario);
        });
    }
    buscarUserTelefono(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where telefono1 = ?', [req.body.telefono]);
            res.json(usuario);
        });
    }
    buscarUserCedula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.query('SELECT id, nombre, username, email, password FROM usuarios Where cedula = ?', [req.body.cedula]);
            res.json(usuario);
        });
    }
    getOneByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const usuarios = yield db_1.default.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            if (usuarios.length > 0) {
                return res.json(usuarios[0]);
            }
            res.json({ message: "error" });
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
    updatePasswordByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const { email } = req.params;
            req.body.password = yield functions_1.default.encryptPassword(password);
            try {
                yield db_1.default.query('UPDATE usuarios set ? WHERE email = ?', [req.body, email]);
                res.json({ message: "ok" });
            }
            catch (err) {
                res.json({ message: "errorBD" });
            }
        });
    }
    /**
    * actualizar y eliminar usuarios
    */
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
            }
            catch (e) {
                console.log(e);
            }
            try {
                var response = {};
                response.type = req.body.filetype;
                response.data = new Buffer(req.body.value, 'base64');
                var imageBuffer = response;
                var userUploadedFeedMessagesLocation = 'build/img/usuarios/';
                var ruta = 'usuarios/' + req.body.filename;
                if (!fs.existsSync('build/img/usuarios/')) {
                    fs.mkdirSync("build/img/usuarios", 0o766, function (err) {
                        if (err) {
                            console.log(err);
                            // echo the result back
                            response.send("ERROR! Can't make the directory! \n");
                        }
                    });
                }
                var userUploadedImagePath = userUploadedFeedMessagesLocation + req.body.filename;
                // Save decoded binary image to disk
                try {
                    fs.writeFile(userUploadedImagePath, imageBuffer.data, function () {
                        return __awaiter(this, void 0, void 0, function* () {
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
