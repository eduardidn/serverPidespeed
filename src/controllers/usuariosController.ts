import { Request, Response } from 'express';


import db from '../db';

class UsuariosController {

    public async list(req: Request, res: Response): Promise<void> {
        const usuarios = await db.query('SELECT * FROM usuarios');
        res.json(usuarios);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const usuarios = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        console.log(usuarios.length);
        if (usuarios.length > 0) {
            return res.json(usuarios[0]);
        }
        res.status(404).json({ message: "error" });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE usuarios set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const usuariosController = new UsuariosController;
export default usuariosController;