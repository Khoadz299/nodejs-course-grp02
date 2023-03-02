const fs = require('fs');
const toursData = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8');
const tours = JSON.parse(toursData);
const TourDAO = require('./../DAO/TourDAO')
//CRUD OPERATIONS
exports.getAllTours = async (req, res) => {
    console.log(req.requestTime);
    const tours = await TourDAO.getAllTours();
    res.status(200).json({
        code: 200,
        msg: `OK`,
        data: {
            tours
        }
    })
}

exports.getTour = async (req, res) => {
    console.log(req.params);
    const id = req.params.id*1;
    try{
        const tour = await TourDAO.getTourById(id);
        if (!tour){
            return res
                .status(404)    //NOT FOUND
                .json({
                    code: 404,
                    msg: `Not found tour with Id ${id}!`,
                });
        }

        res.status(200).json({
            code: 200,
            msg: `OK`,
            data: {
                tour
            }
        })
    }catch (e) {
        console.log(e);
        return res
                .status(500)
                .json({
                    code: 500,
                    msg: e
                })
    }


}

exports.createTour = async (req, res) => {
    console.log(req.body);
    const newTour = req.body;
    try {
        await TourDAO.createNewTour(newTour);
        // const tour = await TourDAO.getTourByName(newTour.name);
        return res
            .status(200)
            .json({
                code: 200,
                msg: `Create new tour successfully!`,
                // data: {
                //     tour
                // }
            })
    }catch (e){
        console.log(e);
        res
            .status(500)
            .json({
                code: 500,
                msg: e
            });
    }
}

exports.deleteTour = async (req, res) => {
    const id = req.params.id*1;
    try {
        const tour = await TourDAO.getTourById(id);
        if (!tour){
            return res
                .status(404)    //NOT FOUND
                .json({
                    code: 404,
                    msg: `Not found tour with Id ${id}!`,
                });
        }

        await TourDAO.deleteTourById(id)
        return res
            .status(200)
            .json({
                code: 200,
                msg: `Delete tour with ${id} successfully!`,
            })
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({
                code: 500,
                msg: e
            })
    }
}

exports.updateTour = (req, res) => {
    console.log('Id update', req.params.id);
    const id = req.params.id * 1;
    const index = tours.findIndex((tour) => {return tour.id === id});
    if (index < 0){
        return res.status(404)
            .json({
                code: 404,
                msg: `Not found tour with ${id}!`
            })
    }
    const updateInfo = req.body;
    const tourUpdate = tours[index];
    // console.log('Data update by Id',tourUpdate);
    // if (updateInfo.name !== null && updateInfo.name !== undefined && updateInfo.name.length>0){
    if (updateInfo.name){
        tourUpdate.name = updateInfo.name;
    }
    if (typeof updateInfo.duration === 'number' && updateInfo.duration > 0){
        tourUpdate.duration = updateInfo.duration;
    }
    if (typeof updateInfo.maxGroupSize === 'number'  && updateInfo.maxGroupSize > 0){
        tourUpdate.maxGroupSize = updateInfo.maxGroupSize;
    }

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours) , (err) => {
        res
            .status(200)
            .json({
                code: 200,
                msg: `Update id: ${id} successfully!`
            });
    })
}