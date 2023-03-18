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
const reviewRouter = require('./routes/review');
//router is a middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
module.exports = app;