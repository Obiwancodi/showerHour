'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');


module.exports = db.define('bathroom', {
	name : {
		type: Sequelize.STRING
	},

	floor: {
		type : Sequelize.INTEGER
	}
})