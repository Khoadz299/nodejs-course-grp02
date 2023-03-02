const dbConfig = require('./../database/dbconfig');
const sql = require('mssql');

exports.getAllTours = async () => {
    if (!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }
    let request = dbConfig.db.pool.request();
    const result = await request.query('select * from Tours');
    // console.log(result);
    return result.recordsets[0];
}

exports.getTourById = async (id) => {
    if (!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }
    let request = dbConfig.db.pool.request();
    let result = await request
        .input('id', sql.Int, id)
        .query('select * from Tours where id = @id');
    // console.log(result);
    return result.recordsets[0][0];
}

exports.deleteTourById = async (id) => {
    if(!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }
    let request = dbConfig.db.pool.request();
    let result = await request
        .input('id', sql.Int, id)
        .query('delete Tours where id = @id');

    // console.log(result);
    return result.recordsets;
}

exports.createNewTour = async(tour) => {
    if(!dbConfig.db.pool){
        throw new Error('Not connected to db');
    }

    if (!tour){
        throw new Error('Invalid input param');
    }

    let request = dbConfig.db.pool.request();
    let result = await request
        .input('name', sql.VarChar, tour.name)
        .input('rating', sql.Float, tour.rating)
        .input('price', sql.Int, tour.price)
        .query('insert into Tours (name, rating, price) values (@name,@rating,@price)');
    console.log(result);
    return result.recordsets;
}