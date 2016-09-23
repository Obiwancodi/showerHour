'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
var Bathroom = require('../../../db/models/bathroom.js')
module.exports = router;


router.get('/', function(req,res,next) {
	Bathroom.findAll({})
	.then(function(bathrooms) {
		console.log(bathrooms)
		res.send(bathrooms)
	})
})