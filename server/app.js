import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import outletRouter from './routes/outletRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import userRouter from './routes/userRoutes.js';
import APIError from './utils/apiError.js';
import globalErrorHandler from './controllers/errorController.js';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

const app = express();

// Security HTTP headers
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
    max: 100,
    windowMs: 1 * 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use(limiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// Preventing Parameter Pollution
app.use(hpp());

// Defining allowed origins
let allowedOrigins = [
    'https://www.qless.tech',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

// Defining CORS options
const corsOptions = {
    origin: function (origin, callback) {
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

// Domain: https://api.qless.tech
app.use('/v1/outlets', outletRouter);
app.use('/v1/orders', orderRouter);
app.use('/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
