import express from 'express';
import {
    getAllOutlets,
    createOutlet,
    updateOutlet,
    deleteOutlet,
    getMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
} from '../controllers/outletController.js';

const outletRouter = express.Router();

outletRouter.route('/').get(getAllOutlets).post(createOutlet);
outletRouter.route('/:outletId').patch(updateOutlet).delete(deleteOutlet);
outletRouter.route('/:outletId/menu').get(getMenu).post(addMenuItem);
outletRouter
    .route('/:outletId/menu/:itemId')
    .patch(updateMenuItem)
    .delete(deleteMenuItem);

export default outletRouter;
