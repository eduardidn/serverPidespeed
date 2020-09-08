import { Request, Response } from 'express';


import db from '../db';

class SubcategoriasController {

    public async list(req: Request, res: Response): Promise<void> {
        try{
            var subcategorias = await db.query('SELECT * FROM subcategorias');
            res.json(subcategorias);
        }catch(e){
            console.log(e)
        }
    }

    public async listEsp(req: Request, res: Response): Promise<void> {
        const { ruta } = req.params;
        const { tipo } = req.params;
        try{
            if(tipo == 2){
                const productos = await db.query('SELECT subcategorias.* FROM subcategorias INNER JOIN categorias On categorias.id = subcategorias.categoria_id LEFT JOIN empresas ON empresas.subcategoria_id = subcategorias.id WHERE categorias.ruta = ?', [ruta]);
                res.json(productos);
            }else{
                const productos = await db.query('SELECT subcategorias.* FROM subcategorias INNER JOIN categorias On categorias.id = subcategorias.categoria_id INNER JOIN empresas ON empresas.subcategoria_id = subcategorias.id WHERE categorias.ruta = ? AND subcategorias.publish = 1 AND empresas.publish = 1', [ruta]);
                res.json(productos);
            }
        }catch(err){
            console.log(err); 
        }
    }

    public async listByEmpresa(req: Request, res: Response): Promise<void> {
        const { ruta } = req.params;
        const { tipo } = req.params;
        try{
            const productos = await db.query('SELECT subcategorias.* FROM subcategorias INNER JOIN empresas ON empresas.subcategoria_id = subcategorias.id WHERE empresas.ruta = ?', [ruta]);
            res.json(productos);
        }catch(err){
            console.log(err); 
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const subcategorias = await db.query('SELECT * FROM subcategorias WHERE id = ?', [id]);
        if (subcategorias.length > 0) {
            return res.json(subcategorias[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO subcategorias set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE subcategorias set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM subcategorias WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const subcategoriasController = new SubcategoriasController;
export default subcategoriasController;