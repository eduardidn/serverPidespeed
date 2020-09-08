import { Request, Response } from 'express';

var fs = require('fs');
import db from '../db';

class ProductosController {

    public async list(req: Request, res: Response): Promise<void> {
        const { ruta } = req.params;
        const { tipo } = req.params;
        try{
            var productos;
            if(tipo == 1){
                productos = await db.query('SELECT productos.*, files.url as img FROM productos INNER JOIN empresas ON empresas.id = productos.empresa_id INNER JOIN files ON files.id = productos.files_id WHERE empresas.ruta = ? AND productos.publish = 1', [ruta]);
            }else{
                productos = await db.query('SELECT productos.*, files.url as img FROM productos INNER JOIN empresas ON empresas.id = productos.empresa_id INNER JOIN files ON files.id = productos.files_id WHERE empresas.ruta = ?', [ruta]); 
            }
            res.json(productos);
        }catch(err){
            console.log(err); 
        }
    }

    public async listCat(req: Request, res: Response): Promise<void> {
        const { ruta } = req.params;
        const { tipo } = req.params;
        try{
            if(tipo == 2){
                const productos = await db.query('SELECT categorias_product.* FROM categorias_product INNER JOIN empresas ON empresas.categoria_id = categorias_product.categoria_id WHERE empresas.ruta = ?', [ruta]);
                res.json(productos);
            }else{
                const productos = await db.query('SELECT categorias_product.* FROM categorias_product INNER JOIN empresas ON empresas.categoria_id = categorias_product.categoria_id WHERE empresas.ruta = ? AND categorias_product.publish = 1', [ruta]);
                res.json(productos);
            }
        }catch(err){
            console.log(err); 
        }
    }

    public async listCatEsp(req: Request, res: Response): Promise<void> {
        const { ruta } = req.params;
        const { tipo } = req.params;
        try{
            if(tipo == 2){
                const productos = await db.query('SELECT productos.categoria_product_id, categorias_product.nombre FROM productos INNER JOIN categorias_product On categorias_product.id = productos.categoria_product_id INNER JOIN empresas ON empresas.id = productos.empresa_id WHERE empresas.ruta = ? GROUP BY productos.categoria_product_id', [ruta]);
                res.json(productos);
            }else{
                const productos = await db.query('SELECT productos.categoria_product_id, categorias_product.nombre FROM productos INNER JOIN categorias_product On categorias_product.id = productos.categoria_product_id INNER JOIN empresas ON empresas.id = productos.empresa_id WHERE empresas.ruta = ? AND productos.publish = 1 GROUP BY productos.categoria_product_id', [ruta]);
                res.json(productos);
            }
        }catch(err){
            console.log(err); 
        }
    }

    public async listOneCatEsp(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try{
            const productos = await db.query('SELECT * FROM categorias_product WHERE id = ?', [id]);
            res.json(productos);
        }catch(err){
            console.log(err); 
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const productos = await db.query('SELECT productos.*, files.url as img FROM productos INNER JOIN files ON files.id = productos.files_id WHERE productos.id = ?', [id]);
        console.log(productos.length);
        if (productos.length > 0) {
            return res.json(productos[0]);
        }
        res.json({ message: "error" });
    }

    public async getOneByDatos(req: Request, res: Response): Promise<any> {
        const { nombre } = req.params;
        const { descripcion } = req.params;
        const pedidos = await db.query('SELECT productos.*, files.url as img FROM productos INNER JOIN files ON files.id = productos.files_id WHERE productos.nombre = ? AND productos.descripcion = ?,', [nombre, descripcion]);
        console.log(pedidos.length);
        if (pedidos.length > 0) {
            return res.json(pedidos[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO productos set ?', [req.body]);
            res.json({ message: 'ok', id: result.insertId });
        }catch(e){
            console.log(e);
        }
    }

    public async restarCantidad(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { cantidad } = req.params;
        const productos = await db.query('SELECT cantidad FROM productos WHERE id = ?', [id]);
        if (productos.length > 0) {
            if(productos[0].cantidad != -1){    
            let valor = productos[0].cantidad;
            valor = valor - Number(cantidad);
            await db.query('UPDATE productos SET cantidad = ? WHERE id = ?', [valor,id]);
            return res.json({message: "ok"});
            }
        }
        res.json({ message: "error" });
    }

    public async update(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await db.query('UPDATE productos set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        }catch(err){
            console.log(err)
        }        
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try{
            let files = await db.query('SELECT files_id FROM productos WHERE id = ?', [id]);
            files = files[0];

            let rutaimg = await db.query('SELECT url FROM files WHERE id = ?', [files.files_id]);
            rutaimg = rutaimg[0]

            fs.unlink("./build/img/"+rutaimg.url, (err:any) => {
                if (err) {
                    console.log("failed to delete local image:"+err);
                } else {
                    console.log('successfully deleted local image');                                
                }
            });

            await db.query('DELETE FROM productos WHERE id = ?', [id]);
            await db.query('DELETE FROM files WHERE id = ?', [files.files_id]);
            res.json({ message: "ok" });
        }catch(e){
            console.log(e)
        }
    }

    public async image64(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        let rutaimg = await db.query('SELECT url FROM files WHERE id = ?', [id]);
        if (rutaimg.length > 0) {
            rutaimg = rutaimg[0];
        }

        fs.unlink("./build/img/"+rutaimg.url, (err:any) => {
            if (err) {
                console.log("failed to delete local image:"+err);
            } else {
                console.log('successfully deleted local image');                                
            }
        });
        try{
            var response:any = {};
            response.type = req.body.filetype;
            response.data = new Buffer(req.body.value, 'base64');

            var imageBuffer                      = response;
            var userUploadedFeedMessagesLocation = 'build/img/productos/';
            var ruta = 'productos/'+req.body.filename;

            if (!fs.existsSync('build/img/productos/')) {
                fs.mkdirSync("build/img/productos", 0o766, function(err:any){
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
                    await db.query('UPDATE files set url = ? WHERE id = ?', [ruta, id]);
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

const productosController = new ProductosController;
export default productosController;