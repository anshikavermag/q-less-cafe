import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!'],
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
    passwordChangedAt: Date,
    isActive: {
        type: Boolean,
        default: true,
        select: false,
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;

        if (!this.isNew) {
            this.passwordChangedAt = Date.now() - 1000;
        }
    }
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ isActive: { $ne: false } });
    next();
});

userSchema.methods.checkPassword = async function (
    candidatePassword,
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.isPasswordChanged = function (jwtTimeStamp) {
    if (this.passwordChangedAt) {
        return this.passwordChangedAt > jwtTimeStamp * 1000;
    }
    return false;
};

const User = mongoose.model('User', userSchema);
export default User;
