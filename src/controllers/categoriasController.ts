import { Request, Response } from 'express';

import db from '../db';
import e = require('express');

class CategoriasController {

    public async list(req: Request, res: Response): Promise<void> {
        const {tipo} = req.params;
        let categorias;
        if(tipo == 2){
            categorias = await db.query('SELECT * FROM categorias');
        }else{
            categorias = await db.query('SELECT * FROM categorias WHERE publish = 1');
        }
        res.json(categorias);
    }

    public async listProduct(req: Request, res: Response): Promise<void> {
        const {tipo} = req.params;
        let categorias;
        if(tipo == 2){
            categorias = await db.query('SELECT * FROM categorias_product');
        }else{
            categorias = await db.query('SELECT * FROM categorias_product WHERE publish = 1');
        }
        res.json(categorias);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const categorias = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
        console.log(categorias.length);
        if (categorias.length > 0) {
            return res.json(categorias[0]);
        }
        res.json({ message: "error" });
    }

    public async getOneProduct(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const categorias = await db.query('SELECT * FROM categorias_product WHERE id = ?', [id]);
        console.log(categorias.length);
        if (categorias.length > 0) {
            return res.json(categorias[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO categorias set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE categorias set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM categorias WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO categorias_product set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE categorias_product set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM categorias_product WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const categoriasController = new CategoriasController;
export default categoriasController;