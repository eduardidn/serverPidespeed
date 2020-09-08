import express, { Router } from 'express';

import FilesController from '../controllers/filesController';

class FilesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:type?', FilesController.list);
        this.router.get('/get/one/:id', FilesController.getOne);
        this.router.put('/:id', FilesController.update);
        this.router.post('/:type/:id?', FilesController.create);
        this.router.delete('/:id', FilesController.delete);
    }

}

export default new FilesRoutes().router;

