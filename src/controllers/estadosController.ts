import { Request, Response } from 'express';


import db from '../db';

class EstadosController {

    public async list(req: Request, res: Response): Promise<void> {
        var estados = await db.query('SELECT * FROM estados');
        res.json(estados);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const estados = await db.query('SELECT * FROM estados WHERE id = ?', [id]);
        console.log(estados.length);
        if (estados.length > 0) {
            return res.json(estados[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO estados set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE estados set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM estados WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const estadosController = new EstadosController;
export default estadosController;