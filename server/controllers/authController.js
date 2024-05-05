import { promisify } from 'util';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import APIError from '../utils/apiError.js';

function signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

function sendToken(res, statusCode, user) {
    const token = signToken(user._id);

    // Creating cookies for the JWT
    const cookieOptions = {
        expiresIn: new Date(
            Date.now() +
                process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res.cookie('jwt', token, cookieOptions);

    // Sending the response
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            name: user.name,
            email: user.email,
        },
    });
}

export async function signup(req, res, next) {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        sendToken(res, 201, newUser);
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(
                new APIError('Please provide email and password!', 400),
            );
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.checkPassword(password, user.password))) {
            return next(new APIError('Incorrect email or password!', 401));
        }

        sendToken(res, 200, user);
    } catch (err) {
        next(err);
    }
}

export async function protect(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return next(
                new APIError(
                    'You are not logged in! Please log in to get access.',
                    401,
                ),
            );
        }

        const token = authorization.split(' ')[1];

        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET,
        );

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(
                new APIError(
                    'The user belonging to this token no longer exists.',
                    401,
                ),
            );
        }

        if (user.isPasswordChanged(decoded.iat)) {
            return next(
                new APIError(
                    'The user password was changed. Please log in again!',
                    401,
                ),
            );
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

export function restrictTo(...roles) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            return next(
                new APIError(
                    "You don't have permission to perform this action.",
                    403,
                ),
            );
        }
        next();
    };
}

export async function updatePassword(req, res, next) {
    try {
        const { currentPassword, newPassword, newPasswordConfirm } = req.body;

        if (!currentPassword || !newPassword) {
            return next(
                new APIError(
                    'Please enter the current and the new password!',
                    400,
                ),
            );
        }

        const user = await User.findById(req.user._id).select('+password');

        if (!(await user.checkPassword(currentPassword, user.password))) {
            return next(new APIError('Incorrect password.', 400));
        }

        user.password = newPassword;
        user.passwordConfirm = newPasswordConfirm;
        await user.save();

        sendToken(res, 200, user);
    } catch (err) {
        next(err);
    }
}
