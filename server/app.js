import express from 'express';
import morgan from 'morgan';
import outletRouter from './routes/outletRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/outlets', outletRouter);
app.use('/api/v1/orders', orderRouter);

export default app;
