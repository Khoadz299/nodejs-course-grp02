const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
})
const express = require('express');
const morgan = require('morgan');
const app = express();
//3RD-party MIDDLE WARE - HTTP request logger middleware
app.use(morgan('dev'));
//using express.json middleware -> stand between req and response
app.use(express.json());

//custom middleware
app.use((req, res, next) => {
    const requestTime = new Date().toISOString();
    // console.log(requestTime);
    req.requestTime = requestTime;
    next();
});

//in express, everything is middleware => router = middleware
const tourRouter = require('./routes/tour');
const userRouter = require('./routes/user');
app.use('/api/v1/tours', tourRouter); //use tourRouter as a middleware for specific route '/api/v1/tours'
app.use('/api/v1/users', userRouter); //use userRouter as a middleware for specific route '/api/v1/users'
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
