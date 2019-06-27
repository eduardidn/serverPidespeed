import { Request, Response } from 'express';
import func from '../functions';
import db from '../db';

class ProductosController {

    public async createUser(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        req.body.password = await func.encryptPassword(password);
        try{
            const usuario = await db.query('INSERT INTO usuarios SET ?', [req.body]);
            if(usuario.affectedRows == 1){
                res.json({message : "ok"});
            }else{
                res.status(404).json({message : "error"});
            }
        }catch(err){
            res.status(404).json({message: "errorBD"});
        }
    }

    public async createEmpresa(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(password, salt);
        req.body.password = passHash;
        const productos = await db.query('INSERT INTO empresas SET ?', [req.body]);
        res.json(productos);
    }

    public async createAdmin(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(password, salt);
        req.body.password = passHash;
        const productos = await db.query('INSERT INTO admins SET ?', [req.body]);
        res.json(productos);
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        let password = req.body.password;
        const usuario = await db.query('SELECT nombre, username, email, password FROM usuarios Where email = ? or username = ?', [req.body.user,req.body.user]);
        if(usuario != ""){
            let savedPassword = usuario[0].password;
            let match = await func.matchPassword(password, savedPassword);
            if(match){
                let token = await func.getToken(req.body);
                res.json({message: "ok", token : token});
            }else{
                res.status(404).json({message : "error"});
            }
        }else{
            res.status(404).json({message : "error"});
        }
        
    }

    public async loginEmpresa(req: Request, res: Response): Promise<void> {
        
    }

    public async loginAdmin(req: Request, res: Response): Promise<void> {
       
    }

}

const productosController = new ProductosController;
export default productosController;