const dbConfig = require('./../database/dbconfig');
const dbUtils = require('../utils/dbUtils')
const TourGuideSchema = require('../model/TourGuide');
const UserSchema = require('../model/User');

exports.getByTourId = async function(tourId) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO - 2
  `use ToursDemoGrp02
go
SELECT t.tourId, t.userId, u.userName, u.email, u.name, u.photo, u.role
from TourGuide as t
    left join Users as u
    on t.userId = u.id
where t.tourId = 1`
}

exports.clearAll = async function() {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}

exports.addTourGuideIfNotExisted = async function(tourGuide ) {
  if (!dbConfig.db.pool) {
    throw new Error('Not connected to db');
  }

  // TODO
}