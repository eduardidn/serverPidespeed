import { Request, Response } from 'express';


import db from '../db';

class FavoritosController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const favoritos = await db.query('SELECT empresas.nombre, empresas.horarios,empresas.abierto, empresas.id, empresas.descripcion,empresas.img,empresas.ruta, empresas.img, empresas.logo, categorias.ruta as rutaCategoria from favoritos INNER JOIN empresas on empresas.id = favoritos.empresa_id INNER JOIN categorias ON empresas.categoria_id = categorias.id  WHERE favoritos.usuario_id = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0', [id]);
        res.json(favoritos);
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const { Uid } = req.params;
        const { Eid } = req.params;
        const favoritos = await db.query('SELECT * FROM favoritos WHERE usuario_id = ? AND empresa_id = ?', [Uid,Eid]);
        res.json(favoritos);
    }

    public async listEsp(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { ruta } = req.params;
        const favoritos = await db.query('SELECT empresas.nombre, empresas.horarios,empresas.abierto, empresas.id, empresas.descripcion,empresas.img, empresas.ruta, empresas.img, empresas.logo,categorias.ruta as rutaCategoria from favoritos INNER JOIN empresas on empresas.id = favoritos.empresa_id INNER JOIN categorias ON empresas.categoria_id = categorias.id  WHERE favoritos.usuario_id = ? AND categorias.ruta = ? AND empresas.publish = 1 AND empresas.es_sucursal = 0', [id,ruta]);
        res.json(favoritos);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO favoritos set ?', [req.body]);
        res.json({ message: 'ok' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM favoritos WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const favoritosController = new FavoritosController;
export default favoritosController;