import { Request, Response } from 'express';


import db from '../db';

class AdicionalesController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tipo } = req.params;
        var adicionales;

        if(tipo == 1){
            adicionales = await db.query('SELECT * FROM adicionales WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
        }else{
            adicionales = await db.query('SELECT * FROM adicionales WHERE empresa_id = ?', [id]);
        }
        res.json(adicionales);
    }

    public async listByIds(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        const { tipo } = req.params;
        let id = ids.split(",");
        var adicionales;

        if(tipo == 2){
            try{
                adicionales = await db.query('SELECT adicionales.* FROM adicionales WHERE adicionales.id IN (?)', [id]);
            }catch(e){
                console.log(e);
            }
        }else{
            adicionales = await db.query('SELECT adicionales.* FROM adicionales WHERE adicionales.publish = 1 AND adicionales.id IN (?)', [id]);
        }
        
        res.json(adicionales);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const adicionales = await db.query('SELECT * FROM adicionales WHERE id = ?', [id]);
        console.log(adicionales.length);
        if (adicionales.length > 0) {
            return res.json(adicionales[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO adicionales set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE adicionales set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM adicionales WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const adicionalesController = new AdicionalesController;
export default adicionalesController;