const express = require('express');
const app = express();
app.use(express.json());

const tourController = require('./controllers/tour');

//CRUD OPERATIONS - create read update delete
//method 2: combine same routes but different handlers
app.route('/api/v1/tours')
    .get(tourController.getAllTours)
    .post(tourController.createTour)

app.route('/api/v1/tours/:id')
    .get(tourController.getTour)
    .delete(tourController.deleteTour)
    .patch(tourController.updateTour)

//method 1: split routes
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.patch('/api/v1/tours/:id', updateTour);

app.listen(8080, () => {
    console.log('App running on port 8080');
});
