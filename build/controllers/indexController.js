"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ message: 'ok' });
    }
}
exports.indexController = new IndexController;
