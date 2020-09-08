import { Request, Response } from 'express';
var fs = require('fs');

import func from '../functions';
import db from '../db';

class EmpresasController {

    public async list(req: Request, res: Response): Promise<void> {
        const { ruta } = req.params;
        const { ciudad } = req.params;
        if(ciudad){
            const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1  AND empresas.es_sucursal = 0 AND ciudad = ?', [ruta,ciudad]);
            res.json(empresas);
        }else{
            const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1  AND empresas.es_sucursal = 0', [ruta]);
            res.json(empresas);
        }
    }

    public async listAll(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { ciudad } = req.params;
        if(ciudad){
            const empresas = await db.query('SELECT empresas.*, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.id = ? AND ciudad = ?', [id,ciudad]);
            res.json(empresas);
        }else{
            const empresas = await db.query('SELECT empresas.*, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.id = ?', [id]);
            res.json(empresas);
        }
    }

    public async listHome(req: Request, res: Response): Promise<void> {
        const { type } = req.params;
            if(type == 2){
                const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado ORDER BY empresas.visitas DESC');
            res.json(empresas);
            }else if(type == 3){
                const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.prueba = 1 AND empresas.es_sucursal = 0 ORDER BY empresas.visitas DESC');
            res.json(empresas);
            }{
                const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.publish = 1 AND empresas.es_sucursal = 0 ORDER BY empresas.visitas DESC');
            res.json(empresas);
            }
    }

    public async listPop(req: Request, res: Response): Promise<void> {
        const { ruta } = req.params;
        const { ciudad } = req.params;
        if(ciudad){
            const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0 AND ciudad = ? ORDER BY empresas.visitas', [ruta,ciudad]);
            res.json(empresas);
        }else{
            const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0 ORDER BY empresas.visitas', [ruta]);
        res.json(empresas);
        }
    }

    public async listVen(req: Request, res: Response): Promise<void> {
        const { ruta } = req.params;
        const { ciudad } = req.params;
        if(ciudad){
            const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0 AND ciudad = ? ORDER BY empresas.ventas', [ruta,ciudad]);
            res.json(empresas);
        }else{
            const empresas = await db.query('SELECT empresas.*, categorias.ruta as rutaCategoria, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN categorias on categorias.id = empresas.categoria_id INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0 ORDER BY empresas.ventas', [ruta]);
        res.json(empresas);
        }
    }

    public async getSucursales(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresas = await db.query('SELECT empresas.id, empresas.nombre, empresas.principal FROM empresas WHERE empresas.empresa_id = ?', [id]);
        return res.json(empresas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { ruta } = req.params;
        const empresas = await db.query('SELECT empresas.*, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.ruta = ? AND empresas.es_sucursal = 0', [ruta]);
        if (empresas.length > 0) {
            return res.json(empresas[0]);
        }
        res.json({ message: "error" });
    }

    public async getOneById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresas = await db.query('SELECT empresas.*, estados.nombre as nombreEstado, ciudades.nombre as nombreCiudad FROM empresas INNER JOIN ciudades ON ciudades.id = empresas.ciudad INNER JOIN estados ON estados.id = empresas.estado WHERE empresas.id = ?', [id]);
        console.log(empresas.length);
        if (empresas.length > 0) {
            return res.json(empresas[0]);
        }
        res.json({ message: "error" });
    }

    public async getByTasas(req: Request, res: Response): Promise<void> {
        const { tasa } = req.params;
        const empresas = await db.query(`SELECT empresas.id, empresas.ruta, empresas.tasa, empresas.porcent_mas, empresas.redondear_precio, empresas.tasa_dt, empresas.tasa_bcv from empresas WHERE ${tasa} = 1`);
        res.json(empresas);
    }

    public async addVisita(req: Request, res: Response): Promise<any> {
        const { ruta } = req.params;
        const empresas = await db.query('SELECT empresas.visitas FROM empresas WHERE ruta = ?', [ruta]);
        if (empresas.length > 0) {
            let valor = empresas[0].visitas;
            valor = valor + 1;
            await db.query('UPDATE empresas SEt visitas = ? WHERE ruta = ?', [valor,ruta]);
            return res.json({message: "ok"});
        }
        res.json({ message: "error" });
    }

    public async addVenta(req: Request, res: Response): Promise<any> {
        const { ruta } = req.params;
        const empresas = await db.query('SELECT empresas.ventas FROM empresas WHERE ruta = ?', [ruta]);
        if (empresas.length > 0) {
            let valor = empresas[0].ventas;
            valor = valor + 1;
            await db.query('UPDATE empresas SEt ventas = ? WHERE ruta = ?', [valor,ruta]);
            return res.json({message: "ok"});
        }
        res.json({ message: "error" });
    }

    /**
     * consultas para login
     */

    public async buscarEmpresaEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
        const empresas:any = await db.query('SELECT * FROM empresas WHERE email = ?', [email]);
        if (empresas.length > 0) {
            res.json(empresas[0]);
        }else{
            res.json({ message: "error" });
        }
    }

    public async buscarEmpresaUsername(req: Request, res: Response): Promise<void> {
        const empresas = await db.query('SELECT * FROM empresas WHERE username = ?', [req.body.username]);
        res.json(empresas);
    }

    public async updatePasswordEmpresa(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        const { id } = req.params;
        req.body.password = await func.encryptPassword(password);
        try{
            await db.query('UPDATE empresas set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        }catch(err){
            res.json({message: "errorBD"});
        }
    }

    public async updatePasswordEmpresaByEmail(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        const { email } = req.params;
        req.body.password = await func.encryptPassword(password);
        try{
            await db.query('UPDATE empresas set ? WHERE email = ?', [req.body, email]);
            res.json({ message: "ok" });
        }catch(err){
            res.json({message: "errorBD"});
        }
    }
    // fin de consultas para login

    public async create(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        req.body.password = await func.encryptPassword(password);
        try{
            const result = await db.query('INSERT INTO empresas set ?', [req.body]);
            res.json({ message: 'ok', id: result.insertId });
        }catch(err){
            console.log(err);
            res.json({ message: 'error'});
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try{
            await db.query('UPDATE empresas set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        }catch(e){
            console.log(e)
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM empresas WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }

    public async image64(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        let rutaimg = await db.query('SELECT img FROM empresas WHERE id = ?', [id]);
        if (rutaimg.length > 0) {
            rutaimg = rutaimg[0];
        }
        if(rutaimg.img != "web/default-empresas.jpg"){
            fs.unlink("./build/img/"+rutaimg.img, (err:any) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    console.log('successfully deleted local image');                                
                }
            });
        }
        try{
            var response:any = {};
            response.type = req.body.filetype;
            response.data = new Buffer(req.body.value, 'base64');

            var imageBuffer                      = response;
            var userUploadedFeedMessagesLocation = 'build/img/empresas/';
            var ruta = 'empresas/'+req.body.filename;

            if (!fs.existsSync('build/img/empresas/')) {
                fs.mkdirSync("build/img/empresas", 0o766, function(err:any){
                    if(err){
                        console.log(err);
                        // echo the result back
                        response.send("ERROR! Can't make the directory! \n");
                    }
                });
            }

            var userUploadedImagePath = userUploadedFeedMessagesLocation + req.body.filename;

            // Save decoded binary image to disk
            try{
                fs.writeFile(userUploadedImagePath, imageBuffer.data, async function() {

                    await db.query('UPDATE empresas set img = ? WHERE id = ?', [ruta, id]);
                    res.json({ message: 'ok'});

                });
            }catch(error){
                res.json({ message: 'error'});
            }

        }catch(error){
            res.json({ message: 'error'});
        }    
    }

    public async logo64(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        let rutaimg = await db.query('SELECT logo FROM empresas WHERE id = ?', [id]);
        if (rutaimg.length > 0) {
            rutaimg = rutaimg[0];
        }
        if(rutaimg.logo != "web/6.png"){
            fs.unlink("./build/img/"+rutaimg.logo, (err:any) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    console.log('successfully deleted local image');                                
                }
            });
        }
        try{
            var response:any = {};
            response.type = req.body.filetype;
            response.data = new Buffer(req.body.value, 'base64');

            var imageBuffer                      = response;
            var userUploadedFeedMessagesLocation = 'build/img/logos/';
            var ruta = 'logos/'+req.body.filename;

            if (!fs.existsSync('build/img/logos/')) {
                fs.mkdirSync("build/img/logos", 0o766, function(err:any){
                    if(err){
                        console.log(err);
                        // echo the result back
                        response.send("ERROR! Can't make the directory! \n");
                    }
                });
            }

            var userUploadedImagePath = userUploadedFeedMessagesLocation + req.body.filename;

            // Save decoded binary image to disk
            try{
                fs.writeFile(userUploadedImagePath, imageBuffer.data, async function() {
                    await db.query('UPDATE empresas set logo = ? WHERE id = ?', [ruta, id]);
                    res.json({ message: 'ok'});
                });
            }catch(error){
                res.json({ message: 'error'});
            }

        }catch(error){
            res.json({ message: 'error'});
        }    
    }
}

const empresasController = new EmpresasController;
export default empresasController;