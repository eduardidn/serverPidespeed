import { Request, Response } from 'express';

import db from '../db';
var fs = require('fs');

class PedidosController {

    public async list(req: Request, res: Response): Promise<void> {
        const pedidos = await db.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id ORDER BY pedidos.id DESC');
        res.json(pedidos);
    }

    public async listAprobar(req: Request, res: Response): Promise<void> {
        const pedidos = await db.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.aprobado = 0 AND pedidos.cancelado = 0 ORDER BY pedidos.id DESC');
        res.json(pedidos);
    }

    public async listTerminados(req: Request, res: Response): Promise<void> {
        const pedidos = await db.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.aprobado = 1 AND pedidos.terminado = 1 ORDER BY pedidos.id DESC');
        res.json(pedidos);
    }

    public async listCancelados(req: Request, res: Response): Promise<void> {
        const pedidos = await db.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.cancelado = 1 ORDER BY pedidos.id DESC');
        res.json(pedidos);
    }

    public async listUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const pedidos = await db.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.usuario_id = ? ORDER BY pedidos.id DESC', [id]);
        res.json(pedidos);
    }

    public async getByPago(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        let id = ids.split(",");
        var tamanos;
        try{
            tamanos = await db.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.id IN (?)', [id]);        
        }catch(e){
            console.log(e);
        }
        res.json(tamanos);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const pedidos = await db.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.id = ?', [id]);
        console.log(pedidos.length);
        if (pedidos.length > 0) {
            return res.json(pedidos[0]);
        }
        res.json({ message: "error" });
    }

    public async getOneByDatos(req: Request, res: Response): Promise<any> {
        const { codigo } = req.params;
        const { precio } = req.params;
        const pedidos = await db.query('SELECT pedidos.*, files.url as img FROM pedidos INNER JOIN files ON files.id = pedidos.files_id WHERE pedidos.codigo = ? AND pedidos.precio = ?,', [codigo, precio]);
        console.log(pedidos.length);
        if (pedidos.length > 0) {
            return res.json(pedidos[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await db.query('INSERT INTO pedidos set ?', [req.body]);
        res.json({ message: 'ok', id: result.insertId});
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE pedidos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM pedidos WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const pedidosController = new PedidosController;
export default pedidosController;