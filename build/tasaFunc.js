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
const functions_1 = __importDefault(require("./functions"));
const cron = require('node-cron');
const axios = require('axios');
class TasaFunc {
    constructor() {
        this.mes = 0;
        cron.schedule('*/30 * * * *', () => {
            this.revisarTasa();
        });
        this.revisarTasa();
    }
    revisarTasa() {
        //verificar tasa dollar today
        axios.get('https://s3.amazonaws.com/dolartoday/data.json').then((response) => __awaiter(this, void 0, void 0, function* () {
            let tasaBCV = response.data.USD.promedio_real.toFixed();
            let tasaDT = response.data.USD.promedio.toFixed();
            //token para las consultas restringidas
            this.token = yield functions_1.default.getToken({ token: 123215 });
            let data = {
                tasa_dt: tasaDT,
                tasa_bcv: tasaBCV
            };
            //actualizar tasa config
            axios.put(`https://ssl.pidespeed.com/api/config/1`, data, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error) => {
                console.log(error);
            });
            this.cambiarTasaBCV(tasaBCV);
            this.cambiarTasaDT(tasaDT);
        })).catch((error) => {
            console.log(error);
        });
    }
    cambiarTasaDT(tasaDT) {
        //buscar empresas con tasa de dolar today
        axios.get('https://ssl.pidespeed.com/public/empresas/get/byTasa/tasa_dt').then((empresas) => {
            //recorrer empresas
            empresas.data.map((empresa) => {
                if (empresa.tasa != tasaDT) {
                    //buscar adicionales
                    axios.get(`https://ssl.pidespeed.com/public/adicionales/${empresa.id}/2`).then((adicionales) => {
                        //recorrer adicionales
                        adicionales.data.forEach((adicional, index) => {
                            let precioFinal1 = 0;
                            if (adicional.precio$ != 0) {
                                let precioBs = Math.round(tasaDT * adicional.precio$);
                                if (empresa.porcent_mas != 0) {
                                    precioBs = Math.round(precioBs + ((precioBs * empresa.porcent_mas) / 100));
                                }
                                precioFinal1 = precioBs;
                                if (empresa.redondear_precio == 1) {
                                    let precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums == "500") {
                                        precioFinal1 = precioBs;
                                    }
                                    else {
                                        let longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            let precio = {
                                precio: precioFinal1
                            };
                            if (precioFinal1 != 0) {
                                //actualizar precio de adicional
                                axios.put(`https://ssl.pidespeed.com/api/adicionales/${adicional.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error) => {
                                    console.log(error);
                                });
                            }
                        });
                        //foreacho de adicionales
                    }).catch((error) => {
                        console.log(error);
                    });
                    //busqueda de productos
                    axios.get(`https://ssl.pidespeed.com/public/productos/${empresa.ruta}/2`).then((productos) => {
                        //recorrer productos
                        productos.data.forEach((producto, index) => {
                            let precioFinal1 = 0;
                            let precioFinalToGo = 1;
                            if (producto.precio1_dl != 0) {
                                let precioBs = Math.round(tasaDT * producto.precio1_dl);
                                if (empresa.porcent_mas != 0) {
                                    precioBs = Math.round(precioBs + ((precioBs * empresa.porcent_mas) / 100));
                                }
                                precioFinal1 = precioBs;
                                if (empresa.redondear_precio == 1) {
                                    let precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums == "500") {
                                        precioFinal1 = precioBs;
                                    }
                                    else {
                                        let longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            if (producto.to_go > 1) {
                                let precioBs = Math.round(tasaDT * producto.to_go$);
                                precioFinalToGo = precioBs;
                                if (empresa.redondear_precio == 1) {
                                    let precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums == "500") {
                                        precioFinalToGo = precioBs;
                                    }
                                    else {
                                        let longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinalToGo = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinalToGo = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            else if (producto.to_go == 0) {
                                precioFinalToGo = 0;
                            }
                            let precio = {
                                precio1: precioFinal1,
                                to_go: precioFinalToGo
                            };
                            //modificar precio de productos
                            axios.put(`https://ssl.pidespeed.com/api/productos/${producto.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } }).then((producto) => {
                                if (index == (productos.data.length - 1)) {
                                    let data = {
                                        tasa: tasaDT
                                    };
                                    axios.put(`https://ssl.pidespeed.com/api/empresas/${empresa.id}`, data, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error) => {
                                        console.log(error);
                                    });
                                }
                            }).catch((error) => {
                                console.log(error);
                            });
                        });
                        //forech de productos
                    }).catch((error) => {
                        console.log(error);
                    });
                    //busqueda de productos
                }
            });
            //map de empresas
        }).catch((error) => {
            console.log(error);
        });
        //busqueda de empresas
    }
    cambiarTasaBCV(tasaBCV) {
        //buscar empresas con tasa de dolar BCV
        axios.get('https://ssl.pidespeed.com/public/empresas/get/byTasa/tasa_bcv').then((empresas) => {
            //recorrer empresas
            empresas.data.map((empresa) => {
                if (empresa.tasa != tasaBCV) {
                    //buscar adicionales
                    axios.get(`https://ssl.pidespeed.com/public/adicionales/${empresa.id}/2`).then((adicionales) => {
                        //recorrer adicionales
                        adicionales.data.forEach((adicional, index) => {
                            let precioFinal1 = 0;
                            if (adicional.precio$ != 0) {
                                let precioBs = Math.round(tasaBCV * adicional.precio$);
                                if (empresa.porcent_mas != 0) {
                                    precioBs = Math.round(precioBs + ((precioBs * empresa.porcent_mas) / 100));
                                }
                                precioFinal1 = precioBs;
                                if (empresa.redondear_precio == 1) {
                                    let precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums == "500") {
                                        precioFinal1 = precioBs;
                                    }
                                    else {
                                        let longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            let precio = {
                                precio: precioFinal1
                            };
                            if (precioFinal1 != 0) {
                                //modificar precio de adicionales
                                axios.put(`https://ssl.pidespeed.com/api/adicionales/${adicional.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error) => {
                                    console.log(error);
                                });
                            }
                        });
                        //foreacho de adicionales
                    }).catch((error) => {
                        console.log(error);
                    });
                    //busqueda de productos
                    axios.get(`https://ssl.pidespeed.com/public/productos/${empresa.ruta}/2`).then((productos) => {
                        //recorrer productos
                        productos.data.forEach((producto, index) => {
                            let precioFinal1 = 0;
                            let precioFinalToGo = 1;
                            if (producto.precio1_dl != 0) {
                                let precioBs = Math.round(tasaBCV * producto.precio1_dl);
                                if (empresa.porcent_mas != 0) {
                                    precioBs = Math.round(precioBs + ((precioBs * empresa.porcent_mas) / 100));
                                }
                                precioFinal1 = precioBs;
                                if (empresa.redondear_precio == 1) {
                                    let precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums == "500") {
                                        precioFinal1 = precioBs;
                                    }
                                    else {
                                        let longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            if (producto.to_go > 1) {
                                let precioBs = Math.round(tasaBCV * producto.to_go$);
                                precioFinalToGo = precioBs;
                                if (empresa.redondear_precio == 1) {
                                    let precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums == "500") {
                                        precioFinalToGo = precioBs;
                                    }
                                    else {
                                        let longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinalToGo = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinalToGo = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            else if (producto.to_go == 0) {
                                precioFinalToGo = 0;
                            }
                            let precio = {
                                precio1: precioFinal1,
                                to_go: precioFinalToGo
                            };
                            //modificar precio de productos
                            axios.put(`https://ssl.pidespeed.com/api/productos/${producto.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } }).then((producto) => {
                                if (index == (productos.data.length - 1)) {
                                    let data = {
                                        tasa: tasaBCV
                                    };
                                    axios.put(`https://ssl.pidespeed.com/api/empresas/${empresa.id}`, data, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error) => {
                                        console.log(error);
                                    });
                                }
                            }).catch((error) => {
                                console.log(error);
                            });
                        });
                        //forech de productos
                    }).catch((error) => {
                        console.log(error);
                    });
                    //busqueda de productos
                }
            });
            //map de empresas
        }).catch((error) => {
            console.log(error);
        });
        //busqueda de empresas
    }
}
const tasaFunc = new TasaFunc;
exports.default = tasaFunc;
