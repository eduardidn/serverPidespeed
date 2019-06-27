import { Request, Response } from 'express';


import db from '../db';

class ProductosController {

    public async list(req: Request, res: Response): Promise<void> {
        try{
            const productos = await db.query('SELECT * FROM productos');
            res.json(productos);
        }catch(err){
            console.log(err); 
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const productos = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
        console.log(productos.length);
        if (productos.length > 0) {
            return res.json(productos[0]);
        }
        res.status(404).json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO productos set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE productos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const productosController = new ProductosController;
export default productosController;