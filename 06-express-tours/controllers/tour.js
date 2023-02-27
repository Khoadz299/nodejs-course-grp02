const fs = require('fs');
const toursData = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8');
const tours = JSON.parse(toursData);

//CRUD OPERATIONS
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        code: 200,
        msg: `OK`,
        data: {
            tours
        }
    })
}

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id*1;
    const index = tours.findIndex((tour) => {return tour.id === id});
    const tour = tours[index];
    if (index >= 0){
        res.status(200).json({
            code: 200,
            msg: `OK`,
            data: {
                tour
            }
        })
    }else{
        res
            .status(404) //HTTP CODE 404 -NOT FOUND
            .json({
                code: 404,
                msg: `Not found tour with ${id}!`
            })
    }

}

exports.createTour = (req, res) => {
    console.log(req.body);
    const newTour = req.body;
    tours.push(newTour);
    const jsonText = JSON.stringify(tours);
    fs.writeFile('./dev-data/data/tours-simple.json',jsonText , (err) => {
        if(!err) {
            res
                .status(201) //HTTP COde 201 = Created
                .json({
                    code: 201,
                    msg: `Add new tour successfully!`,
                    data: {
                        tour: newTour
                    }
                });
        } else {
            res
                .status(500)    //HTTP COde 500 = Internal Error
                .json({
                    code: 500,
                    msg: `Add new tour fail!`
                });
        }
    });
}

exports.deleteTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id*1;
    // let index = -1;
    // for (let i = 0; i < tours.length ; i++){
    //     const tour = tours[i];
    //     if (tour.id === id){
    //         index = i;
    //         break
    //     }
    // }
    const index = tours.findIndex((tour) => {return tour.id === id});
    if (index >= 0){
        tours.splice(index,1);
        fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours) , (err) => {
            res
                .status(200)
                .json({
                    code: 200,
                    msg: `Delete id: ${id} successfully!`
                });
        })
    }else{
        res
            .status(404) //HTTP CODE 404 -NOT FOUND
            .json({
                code: 404,
                msg: `Not found tour with ${id}!`
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