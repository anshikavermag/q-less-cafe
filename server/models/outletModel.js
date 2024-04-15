import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Menu item must have a name'],
    },
    price: {
        type: Number,
        required: [true, 'Menu item must have a price'],
        min: [10, 'Price must be at least ₹10'],
    },
    cooking_time: {
        type: Number,
        required: [true, 'Menu item must have cooking_time in minutes'],
        min: [5, 'Cooking time must be at least 5 minutes'],
    },
    image: String,
});

const outletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Outlet must have a name'],
        unique: true,
    },
    contact: {
        type: String,
        validate: {
            validator: function (val) {
                return (
                    val.length === 10 &&
                    [6, 7, 8, 9].includes(parseInt(val.charAt(0)))
                );
            },
            message: 'Contact number must be valid',
        },
    },
    status: {
        type: String,
        default: 'open',
        enum: {
            values: ['open', 'closed'],
            message: 'Outlet status can be: open or closed',
        },
    },
    image: String,
    menu_items: [menuItemSchema],
});

const Outlet = mongoose.model('Outlet', outletSchema);
export default Outlet;
