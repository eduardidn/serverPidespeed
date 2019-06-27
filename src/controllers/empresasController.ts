import { Request, Response } from 'express';


import db from '../db';

class EmpresasController {

    public async list(req: Request, res: Response): Promise<void> {
        const empresas = await db.query('SELECT * FROM empresas');
        res.json(empresas);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresas = await db.query('SELECT * FROM empresas WHERE id = ?', [id]);
        console.log(empresas.length);
        if (empresas.length > 0) {
            return res.json(empresas[0]);
        }
        res.status(404).json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO empresas set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE empresas set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM empresas WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const empresasController = new EmpresasController;
export default empresasController;