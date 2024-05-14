import express from 'express';
import {
    getAllOrders,
    getOrder,
    createOrder,
} from '../controllers/orderController.js';
import { protect } from '../controllers/authController.js';

const orderRouter = express.Router();

orderRouter.use('/', protect);

orderRouter.route('/').get(getAllOrders).post(createOrder);

orderRouter.route('/:id').get(getOrder);

export default orderRouter;
