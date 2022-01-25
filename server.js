import express, { application } from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import cookieParser from 'cookie-parser';
// import morgan from 'morgan';
// import mongoose from 'mongoose';
// import config from './config';
// import { router } from './routes';
import dotenv from 'dotenv';
import colors from 'colors';
const app = express()
app.use(express.json())
dotenv.config()
connectDB();
// app.use(cors({ origin: true, credentials: true }))
app.use(cors());
// app.use(cors({
//     origin: true,
//     credentials: true,
//     exposedHeaders: ["Set-Cookie"],
// }));
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     credentials: true
// }));
app.options('*', cors());
app.use(cookieParser());
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });
//app.use(morgan('dev'));
try {
    app.get('/', (req, res) => {
        res.send('Hello World')
    });
    app.use('/user', userRoute);
} catch (error) {
    console.log(error);
}
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000
app.listen(
    port,
    console.log(
        `Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold
    )
)
