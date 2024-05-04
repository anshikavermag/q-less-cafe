import User from '../models/userModel.js';
import APIError from '../utils/apiError.js';

function filterObj(obj, ...allowedFields) {
    Object.keys(obj).forEach((key) => {
        if (!allowedFields.includes(key)) {
            delete obj[key];
        }
    });
}

export async function updateMe(req, res, next) {
    try {
        const { password, passwordConfirm } = req.body;
        if (password || passwordConfirm) {
            return next(
                new APIError(
                    'This route is not for password updates. Please use /update-password',
                    400,
                ),
            );
        }

        const queryObj = { ...req.body };
        filterObj(queryObj, 'name', 'email');

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            queryObj,
            {
                new: true,
                runValidators: true,
            },
        );

        res.json({
            status: 'success',
            data: {
                updatedUser,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteMe(req, res, next) {
    try {
        await User.findByIdAndUpdate(req.user._id, { isActive: false });
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
}
