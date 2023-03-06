const express = require('express');
//CRUD OPERATIONS - create read update delete
const tourController = require("./../controllers/tour");
const router = express.Router(); //router is a middleware

//middleware handles any Url started with /api/v1/tours and included parameter 'id' inside
router.param('id',
    tourController.checkTourById);

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
