import { Request, Response } from 'express';


import db from '../db';

class FavoritosController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const favoritos = await db.query('SELECT empresas.nombre, empresas.id, empresas.descripcion,empresas.img from favoritos INNER JOIN empresas on empresas.id = favoritos.empresa_id WHERE favoritos.usuario_id = ?', [id]);
        res.json(favoritos);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO favoritos set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM favoritos WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const favoritosController = new FavoritosController;
export default favoritosController;