import { Request, Response } from 'express';


import db from '../db';

class FaqController {

    public async list(req: Request, res: Response): Promise<void> {
        var faq = await db.query('SELECT * FROM faq order by faq.order ASC');
        res.json(faq);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const faq = await db.query('SELECT * FROM faq WHERE id = ?', [id]);
        console.log(faq.length);
        if (faq.length > 0) {
            return res.json(faq[0]);
        }
        res.json({ message: "error" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await db.query('INSERT INTO faq set ?', [req.body]);
            res.json({ message: 'ok' });
        }catch(e){
            console.log(e);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE faq set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "ok" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM faq WHERE id = ?', [id]);
        res.json({ message: "ok" });
    }
}

const faqController = new FaqController;
export default faqController;