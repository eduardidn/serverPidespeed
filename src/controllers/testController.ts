import { Request, Response } from 'express';

class TestController {

    public test(req: Request, res: Response) {
        res.json({message: 'ok'});
    }

}

export const testController = new TestController;