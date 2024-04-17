import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import outletRouter from './routes/outletRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();

// Defining allowed origins
let allowedOrigins = [
    'https://www.qless.tech',
    'http://localhost',
    'http://localhost:5173',
    'http://127.0.0.1',
    'http://127.0.0.1:5173',
];

// Defining CORS options
const corsOptions = {
    origin: function (origin, callback) {
        console.log('origin:', origin);
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Using morgan for logging HTTP requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

// Domain: https://api.qless.tech
app.use('/v1/outlets', outletRouter);
app.use('/v1/orders', orderRouter);

export default app;
