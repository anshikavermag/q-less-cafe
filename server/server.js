import 'dotenv/config';
import app from './app.js';
import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
    console.log(`${err.name}: ${err.message}`);
    process.exit(1);
});

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server running on port:', port);
});

process.on('unhandledRejection', (err) => {
    console.log(`${err.name}: ${err.message}`);
    server.close(() => process.exit(1));
});
