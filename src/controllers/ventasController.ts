import { Request, Response } from 'express';


import db from '../db';

class VentasController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const ventas = await db.query('SELECT * FROM ventas WHERE empresa_id = ?', [id]);
        res.json(ventas);
    }

    public async listAll(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const ventas = await db.query('SELECT * FROM ventas');
        res.json(ventas);
    }

    public async getNoPagados(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const ventas = await db.query('SELECT * FROM ventas WHERE pagado = 0 AND empresa_id = ?', [id]);
        res.json(ventas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const ventas = await db.query('SELECT * FROM ventas WHERE id = ?', [id]);
        console.log(ventas.length);
        if (ventas.length > 0) {
            return res.json(ventas[0]);
        }
        res.json({ message: "error" });
    }

    public async getByPago(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        let id = ids.split(",");
        var ventas;
        try{
            ventas = await db.query('SELECT * FROM ventas WHERE id IN (?)', [id]);        
        }catch(e){
            console.log(e);
        }
        res.json(ventas);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO ventas set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE ventas set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM ventas WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const ventasController = new VentasController;
export default ventasController;