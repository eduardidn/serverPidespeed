import { Request, Response } from 'express';

import db from '../db';

class Detalle_pedidoController {

    public async list(req: Request, res: Response): Promise<void> {
        const detalle_pedido = await db.query('SELECT * FROM detalle_pedido');
        res.json(detalle_pedido);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const detalle_pedido = await db.query('SELECT * FROM detalle_pedido WHERE id = ?', [id]);
        console.log(detalle_pedido.length);
        if (detalle_pedido.length > 0) {
            return res.json(detalle_pedido[0]);
        }
        res.json({ message: "error" });
    }

    public async getPedidos(req: Request, res: Response): Promise<any> {
        const { pid } = req.params;
        const { eid } = req.params;
        const detalle_pedido = await db.query('SELECT * FROM detalle_pedido WHERE pedido_id = ? AND empresa_id = ?', [pid,eid]);
        return res.json(detalle_pedido);
    }

    public async getPedidosByPedido(req: Request, res: Response): Promise<any> {
        const { pid } = req.params;
        const detalle_pedido = await db.query('SELECT * FROM detalle_pedido WHERE pedido_id = ?', [pid]);
        return res.json(detalle_pedido);
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO detalle_pedido set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e)
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE detalle_pedido set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM detalle_pedido WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const detalle_pedidoController = new Detalle_pedidoController;
export default detalle_pedidoController;