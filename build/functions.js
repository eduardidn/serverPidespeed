"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const func = {};
/**
* FUNCIONES DE PASSWORD
*/
func.encryptPassword = (password) => __awaiter(this, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    const hash = yield bcrypt.hash(password, salt);
    return hash;
});
func.matchPassword = (password, savedPassword) => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield bcrypt.compare(password, savedPassword);
    }
    catch (e) {
        console.log(e);
    }
});
/**
* GENERAR TOKENS
*/
func.getToken = (data) => __awaiter(this, void 0, void 0, function* () {
    return yield jwt.sign(data, 'estoessecreto', { expiresIn: '48h' });
});
func.getTokenAdmin = (data) => __awaiter(this, void 0, void 0, function* () {
    return yield jwt.sign(data, 'tokenParaElAdmiiin', { expiresIn: '48h' });
});
func.getTokenEmpresa = (data) => __awaiter(this, void 0, void 0, function* () {
    return yield jwt.sign(data, 'tokenParaLasEmpresaaas', { expiresIn: '48h' });
});
/**
 * VERIFICAR TOKENS
*/
func.verifyToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'estoessecreto', (err, authData) => {
            if (err) {
                res.json({ message: "error" });
            }
            else {
                req.data = authData;
                next();
            }
        });
    }
    else {
        res.json({ message: "undefined" });
    }
});
func.verifyTokenAdmin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'tokenParaElAdmiiin', (err, authData) => {
            if (err) {
                res.json({ message: "error" });
            }
            else {
                req.data = authData;
                next();
            }
        });
    }
    else {
        res.json({ message: "undefined" });
    }
});
func.verifyTokenEmpresa = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'tokenParaLasEmpresaaas', (err, authData) => {
            if (err) {
                res.json({ message: "error" });
            }
            else {
                req.data = authData;
                next();
            }
        });
    }
    else {
        res.json({ message: "undefined" });
    }
});
func.verifyCodigo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const codigo = req.headers['verificacion'];
    if (typeof codigo !== 'undefined') {
        if (codigo != "%Pidespeed2020$PidespeedSecurityCode%") {
            res.json({ message: "error" });
        }
        else {
            next();
        }
    }
    else {
        res.json({ message: "undefined" });
    }
});
exports.default = func;
