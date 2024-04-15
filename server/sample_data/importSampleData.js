import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'node:fs';
import Order from '../models/orderModel.js';
import Outlet from '../models/outletModel.js';
import { sampleOrders } from './sampleOrders.js';

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB connection successful!'));

const orders = sampleOrders;
const outlets = JSON.parse(
    fs.readFileSync(new URL('./sampleOutlets.json', import.meta.url), 'utf-8'),
);

if (process.argv[2] === '--import') {
    try {
        await Order.create(orders);
        await Outlet.create(outlets);
        console.log('Data successfully imported!');
    } catch (err) {
        console.log(err);
    }
} else if (process.argv[2] === '--delete') {
    try {
        await Order.deleteMany();
        await Outlet.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
}

process.exit();
