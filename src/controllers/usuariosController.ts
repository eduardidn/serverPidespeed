import { Request, Response } from 'express';

import func from '../functions';
var fs = require('fs');
import db from '../db';

class UsuariosController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const usuarios = await db.query('SELECT * FROM usuarios');
        res.json(usuarios);
    }
    
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const usuarios = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (usuarios.length > 0) {
            return res.json(usuarios[0]);
        }
        res.json({ message: "error" });
    }
    
    /**
    * consultas para hacer el login 
    */
    
    public async buscarUserEmail(req: Request, res: Response): Promise<void> {
        const usuario = await db.query('SELECT id, nombre, username, email, password FROM usuarios Where email = ?', [req.body.user]);
        res.json(usuario);
    }
    
    public async buscarUserByEmail(req: Request, res: Response): Promise<void> {
        const usuario = await db.query('SELECT * FROM usuarios Where email = ?', [req.body.user]);
        res.json(usuario);
    }

    public async buscarUserUsername(req: Request, res: Response): Promise<void> {
        const usuario = await db.query('SELECT id, nombre, username, email, password FROM usuarios Where username = ?', [req.body.user]);
        res.json(usuario);
    }

    public async buscarUserTelefono(req: Request, res: Response): Promise<void> {
        const usuario = await db.query('SELECT id, nombre, username, email, password FROM usuarios Where telefono1 = ?', [req.body.telefono]);
        res.json(usuario);
    }

    public async buscarUserCedula(req: Request, res: Response): Promise<void> {
        const usuario = await db.query('SELECT id, nombre, username, email, password FROM usuarios Where cedula = ?', [req.body.cedula]);
        res.json(usuario);
    }

    public async getOneByEmail(req: Request, res: Response): Promise<any> {
        const { email } = req.params;
        const usuarios = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuarios.length > 0) {
            return res.json(usuarios[0]);
        }
        res.json({ message: "error" });
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        req.body.password = await func.encryptPassword(password);
        try{
            const usuario = await db.query('INSERT INTO usuarios SET ?', [req.body]);
            if(usuario.affectedRows == 1){
                res.json({message : "ok"});
            }else{
                res.json({message : "error"});
            }
        }catch(err){
            res.json({message: "errorBD"});
        }
    }

    public async updatePasswordByEmail(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        const { email } = req.params;
        req.body.password = await func.encryptPassword(password);
        try{
            await db.query('UPDATE usuarios set ? WHERE email = ?', [req.body, email]);
            res.json({ message: "ok" });
        }catch(err){
            res.json({message: "errorBD"});
        }
    }

    /**
    * actualizar y eliminar usuarios
    */
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }
    
    public async updatePassword(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        const { id } = req.params;
        req.body.password = await func.encryptPassword(password);
        try{
            await db.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        }catch(err){
            res.json({message: "errorBD"});
        }
    }
    
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
    
    public async image64(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try{
            let rutaimg = await db.query('SELECT img FROM usuarios WHERE id = ?', [id]);
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
        }catch(e){
            console.log(e);
        }
        try{
            var response:any = {};
            response.type = req.body.filetype;
            response.data = new Buffer(req.body.value, 'base64');
            
            var imageBuffer                      = response;
            var userUploadedFeedMessagesLocation = 'build/img/usuarios/';
            var ruta = 'usuarios/'+req.body.filename;
            if (!fs.existsSync('build/img/usuarios/')) {
                fs.mkdirSync("build/img/usuarios", 0o766, function(err:any){
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
                    await db.query('UPDATE usuarios set img = ? WHERE id = ?', [ruta, id]);
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

const usuariosController = new UsuariosController;
export default usuariosController;