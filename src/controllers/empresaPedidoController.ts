import { Request, Response } from 'express';

import db from '../db';

class Empresa_pedidoController {

    public async list(req: Request, res: Response): Promise<void> {
        try{
            const empresa_pedido = await db.query('SELECT * FROM empresa_pedido');
            res.json(empresa_pedido);
        }catch(e){
            res.json(e);
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresa_pedido = await db.query('SELECT * FROM empresa_pedido WHERE id = ?', [id]);
        if (empresa_pedido.length > 0) {
            return res.json(empresa_pedido[0]);
        }
        res.json({ message: "error" });
    }

    public async getByPedido(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresa_pedido = await db.query('SELECT * FROM empresa_pedido WHERE pedido_id = ?', [id]);
        return res.json(empresa_pedido);
    }

    public async getByEmpresa(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresa_pedido = await db.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? ORDER BY id DESC', [id]);
        return res.json(empresa_pedido);
    }

    public async getByEmpresaByPedido(req: Request, res: Response): Promise<any> {
        const { eid } = req.params;
        const { pid } = req.params;
        const empresa_pedido = await db.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND pedido_id = ?', [eid,pid]);
        return res.json(empresa_pedido);
    }

    public async getAllPendientes(req: Request, res: Response): Promise<any> {
        const empresa_pedido = await db.query('SELECT empresa_pedido.*, empresas.nombre as nombreEmpresa, empresas.email as emailEmpresa, empresas.telefono as telefonoEmpresa FROM empresa_pedido INNER JOIN empresas ON empresas.id = empresa_pedido.empresa_id WHERE empresa_pedido.terminado = 0 AND empresa_pedido.entregado = 0 ORDER BY empresa_pedido.fecha ASC');
        return res.json(empresa_pedido);
    }

    public async getAllTerminados(req: Request, res: Response): Promise<any> {
        const empresa_pedido = await db.query('SELECT empresa_pedido.*, empresas.nombre as nombreEmpresa, empresas.email as emailEmpresa, empresas.telefono as telefonoEmpresa, empresas.logo FROM empresa_pedido INNER JOIN empresas ON empresas.id = empresa_pedido.empresa_id WHERE empresa_pedido.terminado = 1 AND empresa_pedido.entregado = 0 ORDER BY empresa_pedido.fecha ASC');
        return res.json(empresa_pedido);
    }

    public async getPendientes(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresa_pedido = await db.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 0 AND entregado = 0 ORDER BY id DESC', [id]);
        return res.json(empresa_pedido);
    }

    public async getTerminados(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresa_pedido = await db.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 1 AND entregado = 0 ORDER BY fecha ASC', [id]);
            return res.json(empresa_pedido);
    }

    public async getEntregados(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const empresa_pedido = await db.query('SELECT * FROM empresa_pedido WHERE empresa_id = ? AND terminado = 1 AND entregado = 1 ORDER BY id ASC', [id]);
            return res.json(empresa_pedido);
    }

    public async getByPago(req: Request, res: Response): Promise<void> {
        let { ids } = req.params;
        let id = ids.split(",");
        var empresa_pedido;
        try{
            empresa_pedido = await db.query('SELECT * FROM empresa_pedido WHERE id IN (?)', [id]);        
        }catch(e){
            console.log(e);
        }
        res.json(empresa_pedido);
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO empresa_pedido set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e)
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await db.query('UPDATE empresa_pedido set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "ok" });
        }catch(e){
            console.log(e)
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM empresa_pedido WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const empresa_pedidoController = new Empresa_pedidoController;
export default empresa_pedidoController;