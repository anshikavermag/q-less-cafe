import mongoose from 'mongoose';
import Outlet from '../models/outletModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import APIError from '../utils/apiError.js';

const errMessage = 'No outlet found with that ID';

export async function getAllOutlets(req, res, next) {
    try {
        const queryBuilder = new APIFeatures(Outlet.find(), req.query);
        queryBuilder.filter().sort().project().paginate();

        const outlets = await queryBuilder.dbQuery;
        res.json({
            status: 'success',
            results: outlets.length,
            data: {
                outlets,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function createOutlet(req, res, next) {
    try {
        const newOutlet = await Outlet.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newOutlet,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function updateOutlet(req, res, next) {
    try {
        const updatedOutlet = await Outlet.findByIdAndUpdate(
            req.params.outletId,
            req.body,
            { new: true, runValidators: true },
        );

        if (!updatedOutlet) return next(new APIError(errMessage, 404));

        res.json({
            status: 'success',
            data: {
                updatedOutlet,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteOutlet(req, res, next) {
    try {
        const outlet = await Outlet.findById(req.params.outletId);
        if (!outlet) return next(new APIError(errMessage, 404));

        await Outlet.deleteOne({ _id: req.params.outletId });
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
}

export async function getMenu(req, res, next) {
    const { sort: sortQuery } = req.query;

    // Converting query string to object for sorting in aggregation
    // For example: "name,-price" -> { 'menu_items.name': 1, 'menu_items.price': -1 }
    let sortBy = {};
    if (sortQuery) {
        sortQuery.split(',').forEach((field) => {
            field.startsWith('-')
                ? (sortBy['menu_items.' + field.slice(1)] = -1)
                : (sortBy['menu_items.' + field] = 1);
        });
    } else {
        sortBy.name = 1;
    }

    try {
        const menu = await Outlet.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.outletId),
                },
            },
            { $unwind: '$menu_items' },
            { $sort: sortBy },
            {
                $group: {
                    _id: {
                        outlet_id: '$_id',
                        outlet_name: '$name',
                    },
                    menu_items: { $push: '$menu_items' },
                },
            },
            {
                $project: {
                    _id: 0,
                    menu_items: 1,
                },
            },
        ]);

        if (!menu[0]) return next(new APIError(errMessage, 404));

        res.json({
            status: 'success',
            results: menu[0].menu_items.length,
            data: menu[0],
        });
    } catch (err) {
        next(err);
    }
}

export async function addMenuItem(req, res, next) {
    try {
        const updatedOutlet = await Outlet.findByIdAndUpdate(
            req.params.outletId,
            { $push: { menu_items: req.body } },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!updatedOutlet) return next(new APIError(errMessage, 404));

        res.status(201).json({
            status: 'success',
            data: {
                menu_items: updatedOutlet.menu_items,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function updateMenuItem(req, res, next) {
    const reqEntries = Object.entries(req.body);
    const { outletId, itemId } = req.params;

    try {
        const outlet = await Outlet.findOne({
            _id: outletId,
            'menu_items._id': itemId,
        });

        if (!outlet) return next(new APIError(errMessage, 404));

        // Finding the index of the menu item
        const index = outlet.menu_items.findIndex((item) =>
            item._id.equals(itemId),
        );

        // Updating only the fields passed in the request
        reqEntries.forEach(([field, value]) => {
            outlet.menu_items[index][field] = value;
        });
        const updatedOutlet = await outlet.save();

        res.json({
            status: 'success',
            menu_items: updatedOutlet.menu_items,
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteMenuItem(req, res, next) {
    const { outletId, itemId } = req.params;

    try {
        const updatedOutlet = await Outlet.findByIdAndUpdate(outletId, {
            $pull: { menu_items: { _id: itemId } },
        });

        if (!updatedOutlet) return next(new APIError(errMessage, 404));

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
}
