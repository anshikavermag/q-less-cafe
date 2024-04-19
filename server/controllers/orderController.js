import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import APIError from '../utils/apiError.js';

const errMessage = 'No order found with that ID';

export async function getAllOrders(req, res, next) {
    try {
        const queryBuilder = new APIFeatures(Order.find(), req.query);
        queryBuilder.filter().sort().project().paginate();

        const orders = await queryBuilder.dbQuery;
        res.json({
            status: 'success',
            results: orders.length,
            data: {
                orders,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function getOrder(req, res, next) {
    try {
        const order = await Order.findById(req.params.id).select('-__v');

        if (!order) return next(new APIError(errMessage, 404));

        res.json({
            status: 'success',
            data: {
                order,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function createOrder(req, res, next) {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newOrder,
            },
        });
    } catch (err) {
        next(err);
    }
}
