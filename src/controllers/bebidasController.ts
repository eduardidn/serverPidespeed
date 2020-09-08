import { Request, Response } from 'express';


import db from '../db';

class BebidasController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tipo } = req.params;
        var bebidas;

        if(tipo == 1){
            bebidas = await db.query('SELECT * FROM bebidas WHERE empresa_id = ? AND publish = 1 AND cantidad != 0', [id]);
        }else{
            bebidas = await db.query('SELECT * FROM bebidas WHERE empresa_id = ?', [id]);
        }
        res.json(bebidas);
    }

    public async listByIds(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        const { tipo } = req.params;
        let id = ids.split(",");
        var bebidas;

        if(tipo == 2){
            try{
                bebidas = await db.query('SELECT bebidas.* FROM bebidas WHERE bebidas.id IN (?)', [id]);
            }catch(e){
                console.log(e);
            }
        }else{
            bebidas = await db.query('SELECT bebidas.* FROM bebidas WHERE bebidas.publish = 1 AND bebidas.id IN (?)', [id]);
        }
        
        res.json(bebidas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const bebidas = await db.query('SELECT * FROM bebidas WHERE id = ?', [id]);
        console.log(bebidas.length);
        if (bebidas.length > 0) {
            return res.json(bebidas[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO bebidas set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE bebidas set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM bebidas WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const bebidasController = new BebidasController;
export default bebidasController;