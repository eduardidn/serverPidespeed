import { Router } from 'express';

import { testController } from '../controllers/testController';

class TestRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/test', testController.test);
    }

}

const testRoutes = new TestRoutes();
export default testRoutes.router;