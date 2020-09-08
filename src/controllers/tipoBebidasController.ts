import { Request, Response } from 'express';

import db from '../db';

class TipoBebidasController {

    public async list(req: Request, res: Response): Promise<void> {
        const tipo_bebidas = await db.query('SELECT * FROM tipo_bebidas');
        res.json(tipo_bebidas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tipo_bebidas = await db.query('SELECT * FROM tipo_bebidas WHERE id = ?', [id]);
        console.log(tipo_bebidas.length);
        if (tipo_bebidas.length > 0) {
            return res.json(tipo_bebidas[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO tipo_bebidas set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE tipo_bebidas set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM tipo_bebidas WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const tipoBebidasController = new TipoBebidasController;
export default tipoBebidasController;