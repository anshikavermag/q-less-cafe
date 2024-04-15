import 'dotenv/config';
import app from './app.js';
import mongoose from 'mongoose';

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running on port:', port);
});
