"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV == 'development') {
    dotenv_1.default.config();
}
const bluebird_1 = require("bluebird");
let database = {
    host: "34.232.202.24",
    user: "root",
    password: "Pidespeed2020$",
    database: "b4bdttx6r1sgazwbqffd"
};
const db = mysql_1.default.createPool(database);
db.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }
    if (connection)
        connection.release();
    console.log('DB is Connected');
    return;
});
//Promisify Pool Querys
db.query = bluebird_1.promisify(db.query);
exports.default = db;
