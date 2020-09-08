import { Request, Response } from 'express';


import db from '../db';
var fs = require('fs');

class FilesController {

    public async list(req: Request, res: Response): Promise<void> {
        const { type } = req.params;
        var files;
        if(type){
            files = await db.query('SELECT * FROM files WHERE type = ?', [type]);
        }else{
            files = await db.query('SELECT * FROM files');
        }
        res.json(files);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const files = await db.query('SELECT * FROM files WHERE id = ?', [id]);
        console.log(files.length);
        if (files.length > 0) {
            return res.json(files[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const { type } = req.params;
        const { id } = req.params;
        if(id){
            let rutaimg = await db.query('SELECT files.url FROM files INNER JOIN productos ON productos.files_id = files.id WHERE productos.id = ?', [id]);
            if (rutaimg.length > 0) {
                rutaimg = rutaimg[0];
            }
    
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
            response.data = Buffer.from(req.body.value, 'base64');

            var imageBuffer                      = response;
            var userUploadedFeedMessagesLocation = `build/img/${type}/`;
            var ruta = `${type}/`+req.body.filename;

            if (!fs.existsSync(`build/img/${type}/`)) {
                fs.mkdirSync(`build/img/${type}`, 0o766, function(err:any){
                    if(err){
                        console.log(err);
                        // echo the result back
                        response.send("ERROR! Can't make the directory! \n");
                    }else{
                        console.log("se creo");
                    }
                });
            }

            var userUploadedImagePath = userUploadedFeedMessagesLocation + req.body.filename;

            // Save decoded binary image to disk
            var datos = {
                url: ruta,
                type: type
            }
            try{
                fs.writeFile(userUploadedImagePath, imageBuffer.data, async function() {
                    let file = await db.query('INSERT INTO files set ?', [datos]);
                    res.json({ message: 'ok', id: file.insertId});
                });
            }catch(error){
                res.json({ message: 'error'});
            }

        }catch(error){
            res.json({ message: 'error'});
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE files set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM files WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const filesController = new FilesController;
export default filesController;