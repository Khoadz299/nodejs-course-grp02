const express = require('express');
//CRUD OPERATIONS - create read update delete
const tourController = require("./../controllers/tour");
const router = express.Router(); //router is a middleware
//method 2: combine same routes but different handlers
//     /api/v1/tours
router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)
//     /api/v1/tours/:id
router.route('/:id')
    .get(tourController.getTour)
    .delete(tourController.deleteTour)
    .patch(tourController.updateTour)

module.exports = router;

//method 1: split routes
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.patch('/api/v1/tours/:id', updateTour);
