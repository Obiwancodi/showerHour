'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let User = require('../../../db/models/user.js')
var Bathroom = require('../../../db/models/bathroom.js')
var Shower = require('../../../db/models/shower.js')





router.get('/', function(req,res,next) {
	Shower.findAll({})
	.then(function(showers) {
		res.send(showers)
	})
})

router.get('/personshower', function(req,res,next) {
	console.log("ajldjdfs",req.session.id)
	Shower.findAll({
		where: {
			userId : req.session.passport.user
		}
	})
	.then(function(showers){
		console.log(showers)
		res.send(showers)
	})
})


router.post('/',function(req,res,next) {
	console.log(req.body.showerTime[0])
	var time = req.body.showerTime[0] + ":" + req.body.showerTime[1]
	console.log(new Date(time))
	
	
	var twentyMinutesLater = new Date(time);
	var fun = twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
	console.log("LOOK AT CHU",fun)
	Shower.create({
		bathroomId : req.body.bathroom.id,
		userId : req.session.passport.user,
		showerTime: time,
		endTime: fun
	})
	.then(function(shower) {
		res.status(200)
		res.send(shower)
	})
	.catch(function(error) {
		console.log(error)
	})
})