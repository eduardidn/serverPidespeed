"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_1 = require("../controllers/testController");
class TestRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', testController_1.testController.test);
    }
}
const testRoutes = new TestRoutes();
exports.default = testRoutes.router;
