"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestController {
    test(req, res) {
        res.json({ message: 'ok' });
    }
}
exports.testController = new TestController;
