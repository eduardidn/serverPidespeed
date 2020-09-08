import { Request, Response } from 'express';


import db from '../db';

class SiropesController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tipo } = req.params;
        var siropes;

        if(tipo == 1){
            siropes = await db.query('SELECT * FROM siropes WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
        }else{
            siropes = await db.query('SELECT * FROM siropes WHERE empresa_id = ?', [id]);
        }
        res.json(siropes);
    }

    public async listByIds(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        const { tipo } = req.params;
        let id = ids.split(",");
        var siropes;

        if(tipo == 2){
            try{
                siropes = await db.query('SELECT siropes.* FROM siropes WHERE siropes.id IN (?)', [id]);
            }catch(e){
                console.log(e);
            }
        }else{
            siropes = await db.query('SELECT siropes.* FROM siropes WHERE siropes.publish = 1 AND siropes.id IN (?)', [id]);
        }
        
        res.json(siropes);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const siropes = await db.query('SELECT * FROM siropes WHERE id = ?', [id]);
        console.log(siropes.length);
        if (siropes.length > 0) {
            return res.json(siropes[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO siropes set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE siropes set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM siropes WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const siropesController = new SiropesController;
export default siropesController;