import { Request, Response } from 'express';

import db from '../db';

class AcompsController {

    public async list(req: Request, res: Response): Promise<void> {
        const acomps = await db.query('SELECT * FROM acomps');
        res.json(acomps);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const acomps = await db.query('SELECT * FROM acomps WHERE id = ?', [id]);
        console.log(acomps.length);
        if (acomps.length > 0) {
            return res.json(acomps[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO acomps set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE acomps set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM acomps WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const acompsController =  new AcompsController
export default acompsController;