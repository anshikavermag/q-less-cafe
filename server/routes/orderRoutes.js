import express from 'express';
import {
    getAllOrders,
    getOrder,
    createOrder,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(createOrder);
orderRouter.route('/:id').get(getOrder);

export default orderRouter;
