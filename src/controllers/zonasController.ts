import { Request, Response } from 'express';


import db from '../db';

class ZonasController {

    public async list(req: Request, res: Response): Promise<void> {
        const { ciudad } = req.params;
        var zonas;
        zonas = await db.query('SELECT * FROM zonas WHERE ciudad_id = ? ORDER BY nombre ASC', [ciudad]);
        res.json(zonas);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const zonas = await db.query('SELECT * FROM zonas WHERE id = ?', [id]);
        console.log(zonas.length);
        if (zonas.length > 0) {
            return res.json(zonas[0]);
        }
        res.json({ message: "error" });
    }

    public async getByIds(req: Request, res: Response): Promise<void> {
        try{
            let { ids } = req.params;
            let id = ids.split(",");
            var zonas;
    
            try{
                zonas = await db.query('SELECT zonas.* FROM zonas WHERE zonas.id IN (?)', [id]);
            }catch(e){
                console.log(e);
            }
            
            res.json(zonas);
        }catch(err){
            console.log(err);
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO zonas set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE zonas set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM zonas WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const zonasController = new ZonasController;
export default zonasController;