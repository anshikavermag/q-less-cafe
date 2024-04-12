import express from 'express';
import {
    getAllOutlets,
    getOutlet,
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

outletRouter
    .route('/:id')
    .get(getOutlet)
    .patch(updateOutlet)
    .delete(deleteOutlet);

outletRouter.route('/:id/menu').get(getMenu).post(addMenuItem);

outletRouter
    .route('/:outletID/menu/:itemID')
    .patch(updateMenuItem)
    .delete(deleteMenuItem);

export default outletRouter;
