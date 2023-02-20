const express = require('express');
const fs = require('fs');

const toursData = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8');
const tours = JSON.parse(toursData);

const app = express();
app.use(express.json());

const indexHandler = (req, res) => {
    // res.status(200).send('Hello from sv');
    const result = {
        message: 'Hello from sv',
        app: 'tours',
    };
    res.status(200).json(result);
};

app.get('/', indexHandler);

//CRUD OPERATIONS
const getAllTours = (req, res) => {
    res.status(200).json({
        // tours: tours
        tours
    })
}

const getTour = (req, res) => {
    console.log(req.params);
    const tour = tours[req.params.id*1];
    res.status(200).json({
        tour
    })
}

const createTour = (req, res) => {
    console.log(req.body);

    res.status(200).json({
        msg: "ok",
    })
}

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);





app.listen(8080, () => {
    console.log('App running on port 8080');
});
