import { Request, Response } from 'express';

import db from '../db';

class CategoriasController {

    public async list(req: Request, res: Response): Promise<void> {
        const categorias = await db.query('SELECT * FROM categorias');
        res.json(categorias);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const categorias = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
        console.log(categorias.length);
        if (categorias.length > 0) {
            return res.json(categorias[0]);
        }
        res.status(404).json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO categorias set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE categorias set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM categorias WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const categoriasController = new CategoriasController;
export default categoriasController;