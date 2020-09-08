import { Request, Response } from 'express';


import db from '../db';

class TamanosController {

    public async list(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        const { tipo } = req.params;
        let id = ids.split(",");
        var tamanos;

        if(tipo == 1){
            try{
                tamanos = await db.query('SELECT tamanos.* FROM tamanos WHERE tamanos.publish = 1 AND tamanos.id IN (?)', [id]);
            }catch(e){
                console.log(e);
            }
        }else{
            tamanos = await db.query('SELECT tamanos.* FROM tamanos WHERE tamanos.id IN (?)', [id]);
        }
        
        res.json(tamanos);
    }

    public async listAll(req: Request, res: Response): Promise<void> {
        const tamanos = await db.query('SELECT * FROM tamanos');
        res.json(tamanos);
    }

    public async listByEmpresa(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const tamanos = await db.query('SELECT * FROM tamanos WHERE empresa_id = ?', [id]);
        res.json(tamanos);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tamanos = await db.query('SELECT * FROM tamanos WHERE id = ?', [id]);
        console.log(tamanos.length);
        if (tamanos.length > 0) {
            return res.json(tamanos[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO tamanos set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE tamanos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM tamanos WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const tamanosController = new TamanosController;
export default tamanosController;