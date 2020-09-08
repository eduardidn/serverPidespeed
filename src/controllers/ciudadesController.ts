import { Request, Response } from 'express';


import db from '../db';

class CiudadesController {

    public async list(req: Request, res: Response): Promise<void> {
        var ciudades = await db.query('SELECT * FROM ciudades');
        res.json(ciudades);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const ciudades = await db.query('SELECT * FROM ciudades WHERE id = ?', [id]);
        console.log(ciudades.length);
        if (ciudades.length > 0) {
            return res.json(ciudades[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO ciudades set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE ciudades set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM ciudades WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const ciudadesController = new CiudadesController;
export default ciudadesController;