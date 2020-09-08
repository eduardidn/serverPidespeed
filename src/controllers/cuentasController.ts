import { Request, Response } from 'express';


import db from '../db';

class CuentasController {

    public async list(req: Request, res: Response): Promise<void> {
        var cuentas;
        cuentas = await db.query('SELECT * FROM cuentas');
        res.json(cuentas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const cuentas = await db.query('SELECT * FROM cuentas WHERE id = ?', [id]);
        console.log(cuentas.length);
        if (cuentas.length > 0) {
            return res.json(cuentas[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO cuentas set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE cuentas set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM cuentas WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const cuentasController = new CuentasController;
export default cuentasController;