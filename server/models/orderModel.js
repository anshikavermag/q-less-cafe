import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    outlet_name: {
        type: String,
        required: [true, 'Order item must have an outlet_name'],
    },
    name: {
        type: String,
        required: [true, 'Order item must have a name'],
    },
    price: {
        type: Number,
        required: [true, 'Order item must have a price'],
        min: [10, 'Price must be at least ₹10'],
    },
    quantity: {
        type: Number,
        required: [true, 'Order item must have quantity'],
        min: [1, 'Quantity must be at least 1'],
    },
});

const orderSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: [true, 'Order must have a customer name'],
    },
    customer_contact: {
        type: String,
        required: [true, 'Order must have a customer contact number'],
        validate: {
            validator: function (val) {
                return (
                    val.length === 10 &&
                    [6, 7, 8, 9].includes(parseInt(val.charAt(0)))
                );
            },
            message: 'Customer contact number must be valid',
        },
    },
    order_number: {
        type: Number,
        required: [true, 'Order must have an order_number'],
    },
    order_total: {
        type: Number,
        required: [true, 'Order must have an order_total'],
    },
    status: {
        type: String,
        default: 'new',
        enum: {
            values: ['new', 'cooking', 'completed'],
            message: 'Order status can be: new, cooking or completed',
        },
    },
    cooking_time: {
        type: Number,
        required: [true, 'Order must have cooking_time in minutes'],
        min: [5, 'Cooking time must be at least 5 minutes'],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    order_items: [orderItemSchema],
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
