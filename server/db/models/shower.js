'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');


module.exports = db.define('shower', {
	showerTime : {
		type: Sequelize.DATE
	},
	endTime : {
		type : Sequelize.DATE
	},

	fiveText : {
		type: Sequelize.BOOLEAN
	},

	nowText: {
		type : Sequelize.BOOLEAN
	},

	endText: {
		type: Sequelize.BOOLEAN
	}
})