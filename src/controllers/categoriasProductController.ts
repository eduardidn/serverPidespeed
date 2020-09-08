import { Request, Response } from 'express';


import db from '../db';

class CategoriasProductController {

    public async list(req: Request, res: Response): Promise<void> {
        var categorias_product = await db.query('SELECT categorias_product.*, categorias.icono FROM categorias_product INNER JOIN categorias ON categorias.id = categorias_product.categoria_id ORDER BY nombre ASC');
        res.json(categorias_product);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const categorias_product = await db.query('SELECT * FROM categorias_product WHERE id = ?', [id]);
        console.log(categorias_product.length);
        if (categorias_product.length > 0) {
            return res.json(categorias_product[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO categorias_product set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE categorias_product set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM categorias_product WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const categoriasProductController = new CategoriasProductController;
export default categoriasProductController;