const ReviewDAO = require('./../DAO/ReviewDAO')

//check ID middleware
exports.checkID = async (req, res, next, val) => {
    try{
        const id = val;
       //TODO
    }catch (e) {
        console.error(e);
        return res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e
            });
    }
    next();
};

exports.getAllReviews = async (req, res, next) => {
    try{
        console.log(req.query);

        //TODO

        // res.status(200).json({
        //     //200 - OK
        //     status: 'success',
        //     page,
        //     pageSize,
        //     totalPage,
        //     totalItem,
        //     data: {
        //         reviews
        //     },
        // });
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e
            });
    }
};

exports.createReview = async (req, res, next) => {
    const newTour = req.body;
    try {
       //TODO
    }catch (e){
        console.log(e);
        res
            .status(500)
            .json({
                code: 500,
                msg: e
            });
    }
};

exports.getReview = async (req, res, next) => {
    try{
        console.log(req.params);
        const id = req.params.id * 1;
        //TODO
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e
            });
    }
};

exports.updateReview = async (req, res, next) => {
    try{
        const id = req.params.id * 1;
       //TODO
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e
            });
    }
}

exports.deleteReview = async (req, res, next) => {
    try{
        const id = req.params.id*1;
        //TODO
    }catch (e) {
        console.error(e);
        res
            .status(500)        // 500 - Internal Error
            .json({
                code: 500,
                msg: e
            });
    }
};