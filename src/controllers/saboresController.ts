import { Request, Response } from 'express';


import db from '../db';

class SaboresController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tipo } = req.params;
        var sabores;

        if(tipo == 1){
            sabores = await db.query('SELECT * FROM sabores WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
        }else{
            sabores = await db.query('SELECT * FROM sabores WHERE empresa_id = ?', [id]);
        }
        res.json(sabores);
    }

    public async listByIds(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        const { tipo } = req.params;
        let id = ids.split(",");
        var sabores;

        if(tipo == 2){
            try{
                sabores = await db.query('SELECT sabores.* FROM sabores WHERE sabores.id IN (?)', [id]);
            }catch(e){
                console.log(e);
            }
        }else{
            sabores = await db.query('SELECT sabores.* FROM sabores WHERE sabores.publish = 1 AND sabores.id IN (?)', [id]);
        }
        
        res.json(sabores);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const sabores = await db.query('SELECT * FROM sabores WHERE id = ?', [id]);
        if (sabores.length > 0) {
            return res.json(sabores[0]);
        }
        res.json({ message: "error" });
    }

    public async updateByIds(req: Request, res: Response): Promise<any> {
        let { ids } = req.params;
        let id = ids.split(",");
        try{
            const sabores = await db.query('UPDATE sabores set ? WHERE id IN (?)', [req.body, id]);
            res.json({ message: "ok" });
        }catch(err){
            console.log(err);
            res.json({ message: "error" });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO sabores set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE sabores set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM sabores WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const saboresController = new SaboresController;
export default saboresController;