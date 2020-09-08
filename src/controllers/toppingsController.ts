import { Request, Response } from 'express';


import db from '../db';

class ToppingsController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tipo } = req.params;
        var toppings;

        if(tipo == 1){
            toppings = await db.query('SELECT * FROM toppings WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
        }else{
            toppings = await db.query('SELECT * FROM toppings WHERE empresa_id = ?', [id]);
        }
        res.json(toppings);
    }

    public async listByIds(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        const { tipo } = req.params;
        let id = ids.split(",");
        var toppings;

        if(tipo == 2){
            try{
                toppings = await db.query('SELECT toppings.* FROM toppings WHERE toppings.id IN (?)', [id]);
            }catch(e){
                console.log(e);
            }
        }else{
            toppings = await db.query('SELECT toppings.* FROM toppings WHERE toppings.publish = 1 AND toppings.id IN (?)', [id]);
        }
        
        res.json(toppings);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const toppings = await db.query('SELECT * FROM toppings WHERE id = ?', [id]);
        console.log(toppings.length);
        if (toppings.length > 0) {
            return res.json(toppings[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO toppings set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE toppings set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM toppings WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const toppingsController = new ToppingsController;
export default toppingsController;