const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const TourLocationSchema = require('../model/TourLocation');
const LocationSchema = require('../model/Location');

exports.getByTourId = async function(tourId) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO - 2
  `use ToursDemoGrp01
go
SELECT t.tourId, t.locationId, t.day, l.description, l.type, l.lat, l.lng, l.address
from TourLocation as t left join Locations as l
    on t.locationId = l.id
where t.tourId = 1
ORDER BY t.day`
}


exports.clearAll = async function() {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}

exports.addTourLocationIfNotExisted = async function(tourLocation ) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}