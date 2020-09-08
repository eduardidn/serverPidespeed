import { Request, Response } from 'express';


import db from '../db';

class PagosController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        var pagos;
        pagos = await db.query('SELECT * FROM pagos WHERE empresa_id = ?', [id]);
        res.json(pagos);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const pagos = await db.query('SELECT * FROM pagos WHERE id = ?', [id]);
        console.log(pagos.length);
        if (pagos.length > 0) {
            return res.json(pagos[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO pagos set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE pagos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM pagos WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const pagosController = new PagosController;
export default pagosController;