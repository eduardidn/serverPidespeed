import { Request, Response } from 'express';


import db from '../db';

class ConfigController {

    public async list(req: Request, res: Response): Promise<void> {
        var config;
        try{
            config = await db.query('SELECT * FROM config');
            res.json(config);
        }catch(err){
            console.log(err)
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const config = await db.query('SELECT * FROM config WHERE id = ?', [id]);
        console.log(config.length);
        if (config.length > 0) {
            return res.json(config[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO config set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE config set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM config WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const configController = new ConfigController;
export default configController;