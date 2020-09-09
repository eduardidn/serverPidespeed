
import func from './functions';
const cron = require('node-cron');
const axios = require('axios');

class TasaFunc {

  public mes: any = 0;
  public token: any;

  constructor() {
    cron.schedule('*/30 * * * *', () => {
      this.revisarTasa();
    });
    setTimeout(() => {
      this.revisarTasa()
    }, 15000);
  }

  public revisarTasa() {
    //verificar tasa dollar today
    axios.get('https://s3.amazonaws.com/dolartoday/data.json').then(async (response: any) => {
      let tasaBCV = response.data.USD.promedio_real.toFixed();
      let tasaDT = response.data.USD.promedio.toFixed();

      //token para las consultas restringidas
      this.token = await func.getToken({ token: 123215 });
      let data = {
        tasa_dt: tasaDT,
        tasa_bcv: tasaBCV
      }

      //actualizar tasa config
      axios.put(`https://ssl.pidespeed.com/api/config/1`, data, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error: any) => {
        console.log(error)
      })
      this.cambiarTasaBCV(tasaBCV);
      this.cambiarTasaDT(tasaDT);

    }).catch((error: any) => {
      console.log(error);
    });
  }

  public cambiarTasaDT(tasaDT: any) {
    //buscar empresas con tasa de dolar today
    axios.get('https://ssl.pidespeed.com/public/empresas/get/byTasa/tasa_dt').then((empresas: any) => {
      //recorrer empresas
      empresas.data.map((empresa: any) => {
        if (empresa.tasa != tasaDT) {
          //buscar adicionales
          axios.get(`https://ssl.pidespeed.com/public/adicionales/${empresa.id}/2`).then((adicionales: any) => {
            //recorrer adicionales
            adicionales.data.forEach((adicional: any, index: any) => {
              let precioFinal1 = 0;

              if (adicional.precio$ != 0) {
                let precioBs = Math.round(tasaDT * adicional.precio$);
                if (empresa.porcent_mas != 0) {
                  precioBs = Math.round(precioBs + ((precioBs * empresa.porcent_mas) / 100));
                }
                precioFinal1 = precioBs;
                if (empresa.redondear_precio == 1) {
                  let precioBsString = precioBs.toString();
                  let ultNums: any = precioBsString.substr(-3);
                  let primNums = "";
                  if (ultNums == "500") {
                    precioFinal1 = precioBs;
                  } else {
                    let longitud = precioBsString.length - 3;
                    primNums = precioBsString.slice(0, longitud);
                    ultNums = Number(ultNums);
                    if (ultNums > 500) {
                      primNums = (Number(primNums) + 1).toString();
                      precioFinal1 = Number(primNums + "000");
                    } else {
                      precioFinal1 = Number(primNums + "000")
                    }
                  }
                }
              }

              let precio = {
                precio: precioFinal1
              }

              if (precioFinal1 != 0) {
                //actualizar precio de adicional
                axios.put(`https://ssl.pidespeed.com/api/adicionales/${adicional.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error: any) => {
                  console.log(error);
                });
              }
            })
            //foreacho de adicionales
          }).catch((error: any) => {
            console.log(error);
          });
          //busqueda de productos
          axios.get(`https://ssl.pidespeed.com/public/productos/${empresa.ruta}/2`).then((productos: any) => {
            //recorrer productos
            productos.data.forEach((producto: any, index: any) => {
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
                  let ultNums: any = precioBsString.substr(-3);
                  let primNums = "";
                  if (ultNums == "500") {
                    precioFinal1 = precioBs;
                  } else {
                    let longitud = precioBsString.length - 3;
                    primNums = precioBsString.slice(0, longitud);
                    ultNums = Number(ultNums);
                    if (ultNums > 500) {
                      primNums = (Number(primNums) + 1).toString();
                      precioFinal1 = Number(primNums + "000");
                    } else {
                      precioFinal1 = Number(primNums + "000")
                    }
                  }
                }
              }

              if (producto.to_go > 1) {
                let precioBs = Math.round(tasaDT * producto.to_go$);
                precioFinalToGo = precioBs;
                if (empresa.redondear_precio == 1) {
                  let precioBsString = precioBs.toString();
                  let ultNums: any = precioBsString.substr(-3);
                  let primNums = "";
                  if (ultNums == "500") {
                    precioFinalToGo = precioBs;
                  } else {
                    let longitud = precioBsString.length - 3;
                    primNums = precioBsString.slice(0, longitud);
                    ultNums = Number(ultNums);
                    if (ultNums > 500) {
                      primNums = (Number(primNums) + 1).toString();
                      precioFinalToGo = Number(primNums + "000");
                    } else {
                      precioFinalToGo = Number(primNums + "000")
                    }
                  }
                }
              } else if (producto.to_go == 0) {
                precioFinalToGo = 0;
              }

              let precio = {
                precio1: precioFinal1,
                to_go: precioFinalToGo
              }

              //modificar precio de productos
              axios.put(`https://ssl.pidespeed.com/api/productos/${producto.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } }).then((producto: any) => {
                if (index == (productos.data.length - 1)) {
                  let data = {
                    tasa: tasaDT
                  }
                  axios.put(`https://ssl.pidespeed.com/api/empresas/${empresa.id}`, data, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error: any) => {
                    console.log(error);
                  });
                }
              }).catch((error: any) => {
                console.log(error);
              });
            })
            //forech de productos
          }).catch((error: any) => {
            console.log(error);
          });
          //busqueda de productos
        }
      });
      //map de empresas
    }).catch((error: any) => {
      console.log(error);
    });
    //busqueda de empresas
  }

  public cambiarTasaBCV(tasaBCV: any) {
    //buscar empresas con tasa de dolar BCV
    axios.get('https://ssl.pidespeed.com/public/empresas/get/byTasa/tasa_bcv').then((empresas: any) => {
      //recorrer empresas
      empresas.data.map((empresa: any) => {
        if (empresa.tasa != tasaBCV) {
          //buscar adicionales
          axios.get(`https://ssl.pidespeed.com/public/adicionales/${empresa.id}/2`).then((adicionales: any) => {
            //recorrer adicionales
            adicionales.data.forEach((adicional: any, index: any) => {
              let precioFinal1 = 0;

              if (adicional.precio$ != 0) {
                let precioBs = Math.round(tasaBCV * adicional.precio$);
                if (empresa.porcent_mas != 0) {
                  precioBs = Math.round(precioBs + ((precioBs * empresa.porcent_mas) / 100));
                }
                precioFinal1 = precioBs;
                if (empresa.redondear_precio == 1) {
                  let precioBsString = precioBs.toString();
                  let ultNums: any = precioBsString.substr(-3);
                  let primNums = "";
                  if (ultNums == "500") {
                    precioFinal1 = precioBs;
                  } else {
                    let longitud = precioBsString.length - 3;
                    primNums = precioBsString.slice(0, longitud);
                    ultNums = Number(ultNums);
                    if (ultNums > 500) {
                      primNums = (Number(primNums) + 1).toString();
                      precioFinal1 = Number(primNums + "000");
                    } else {
                      precioFinal1 = Number(primNums + "000")
                    }
                  }
                }
              }

              let precio = {
                precio: precioFinal1
              }

              if (precioFinal1 != 0) {
                //modificar precio de adicionales
                axios.put(`https://ssl.pidespeed.com/api/adicionales/${adicional.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error: any) => {
                  console.log(error);
                });
              }
            })
            //foreacho de adicionales
          }).catch((error: any) => {
            console.log(error);
          });
          //busqueda de productos
          axios.get(`https://ssl.pidespeed.com/public/productos/${empresa.ruta}/2`).then((productos: any) => {
            //recorrer productos
            productos.data.forEach((producto: any, index: any) => {
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
                  let ultNums: any = precioBsString.substr(-3);
                  let primNums = "";
                  if (ultNums == "500") {
                    precioFinal1 = precioBs;
                  } else {
                    let longitud = precioBsString.length - 3;
                    primNums = precioBsString.slice(0, longitud);
                    ultNums = Number(ultNums);
                    if (ultNums > 500) {
                      primNums = (Number(primNums) + 1).toString();
                      precioFinal1 = Number(primNums + "000");
                    } else {
                      precioFinal1 = Number(primNums + "000")
                    }
                  }
                }
              }

              if (producto.to_go > 1) {
                let precioBs = Math.round(tasaBCV * producto.to_go$);
                precioFinalToGo = precioBs;
                if (empresa.redondear_precio == 1) {
                  let precioBsString = precioBs.toString();
                  let ultNums: any = precioBsString.substr(-3);
                  let primNums = "";
                  if (ultNums == "500") {
                    precioFinalToGo = precioBs;
                  } else {
                    let longitud = precioBsString.length - 3;
                    primNums = precioBsString.slice(0, longitud);
                    ultNums = Number(ultNums);
                    if (ultNums > 500) {
                      primNums = (Number(primNums) + 1).toString();
                      precioFinalToGo = Number(primNums + "000");
                    } else {
                      precioFinalToGo = Number(primNums + "000")
                    }
                  }
                }
              } else if (producto.to_go == 0) {
                precioFinalToGo = 0;
              }

              let precio = {
                precio1: precioFinal1,
                to_go: precioFinalToGo
              }

              //modificar precio de productos
              axios.put(`https://ssl.pidespeed.com/api/productos/${producto.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } }).then((producto: any) => {
                if (index == (productos.data.length - 1)) {
                  let data = {
                    tasa: tasaBCV
                  }
                  axios.put(`https://ssl.pidespeed.com/api/empresas/${empresa.id}`, data, { headers: { Authorization: `Bearer ${this.token}` } }).catch((error: any) => {
                    console.log(error);
                  });
                }
              }).catch((error: any) => {
                console.log(error);
              });
            })
            //forech de productos
          }).catch((error: any) => {
            console.log(error);
          });
          //busqueda de productos
        }
      });
      //map de empresas
    }).catch((error: any) => {
      console.log(error);
    });
    //busqueda de empresas
  }
}

const tasaFunc = new TasaFunc
export default tasaFunc;