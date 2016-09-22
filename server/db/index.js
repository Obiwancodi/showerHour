'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
let Bathroom = require('./models/bathroom')
let Shower = require('./models/shower')
// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
Bathroom.belongsToMany(User,{through:"shower"})
User.belongsToMany(Bathroom, {through: "shower"})
