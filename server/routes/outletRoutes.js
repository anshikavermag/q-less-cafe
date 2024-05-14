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
import { protect, restrictTo } from '../controllers/authController.js';

const outletRouter = express.Router();

outletRouter.use('/', protect);

outletRouter
    .route('/')
    .get(getAllOutlets)
    .post(restrictTo('admin'), createOutlet);

outletRouter
    .route('/:outletId')
    .patch(restrictTo('admin'), updateOutlet)
    .delete(restrictTo('admin'), deleteOutlet);

outletRouter
    .route('/:outletId/menu')
    .get(getMenu)
    .post(restrictTo('admin'), addMenuItem);

outletRouter
    .route('/:outletId/menu/:itemId')
    .patch(restrictTo('admin'), updateMenuItem)
    .delete(restrictTo('admin'), deleteMenuItem);

export default outletRouter;
