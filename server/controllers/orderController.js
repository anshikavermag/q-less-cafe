import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import { resourceNotFound, internalServerErr } from '../utils/errors.js';

export async function getAllOrders(req, res) {
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
        internalServerErr(res, err);
    }
}

export async function getOrder(req, res) {
    try {
        const order = await Order.findById(req.params.id).select('-__v');

        if (!order) return resourceNotFound(res, 'Order');

        res.json({
            status: 'success',
            data: {
                order,
            },
        });
    } catch (err) {
        internalServerErr(res, err);
    }
}

export async function createOrder(req, res) {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newOrder,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
}
