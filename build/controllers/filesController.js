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
var fs = require('fs');
class FilesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var files;
            files = yield db_1.default.query('SELECT * FROM files WHERE empresa_id = ?', [id]);
            res.json(files);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const files = yield db_1.default.query('SELECT * FROM files WHERE id = ?', [id]);
            console.log(files.length);
            if (files.length > 0) {
                return res.json(files[0]);
            }
            res.json({ message: "error" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.params;
            const { id } = req.params;
            if (id) {
                let rutaimg = yield db_1.default.query('SELECT files.url FROM files INNER JOIN productos ON productos.files_id = files.id WHERE productos.id = ?', [id]);
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
            try {
                var response = {};
                response.type = req.body.filetype;
                response.data = Buffer.from(req.body.value, 'base64');
                var imageBuffer = response;
                var userUploadedFeedMessagesLocation = `build/img/${type}/`;
                var ruta = `${type}/` + req.body.filename;
                if (!fs.existsSync(`build/img/${type}/`)) {
                    fs.mkdirSync(`build/img/${type}`, 0o766, function (err) {
                        if (err) {
                            console.log(err);
                            // echo the result back
                            response.send("ERROR! Can't make the directory! \n");
                        }
                        else {
                            console.log("se creo");
                        }
                    });
                }
                var userUploadedImagePath = userUploadedFeedMessagesLocation + req.body.filename;
                // Save decoded binary image to disk
                var datos = {
                    url: ruta,
                    type: type
                };
                try {
                    fs.writeFile(userUploadedImagePath, imageBuffer.data, function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            let file = yield db_1.default.query('INSERT INTO files set ?', [datos]);
                            res.json({ message: 'ok', id: file.insertId });
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('UPDATE files set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield db_1.default.query('DELETE FROM files WHERE id = ?', [id]);
            res.json({ message: "ok" });
        });
    }
}
const filesController = new FilesController;
exports.default = filesController;
