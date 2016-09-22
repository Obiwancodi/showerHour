'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let Shower = require('./models/shower')
let User = require('./models/user')




router.get('/', function(req,res,next) {
	Shower.findAll({})
	.then(function(showers) {
		res.send(showers)
	})
})

router.get('/:id', function(req,res,next) {
	Shower.getUser({where : {userId: req.params.id}})
	.then(function(showers){
		res.send(showers)
	})
})


router.post('/',function(req,res,next) {
	User.findOne({
		where : {
			id : req.session.passport.user.id
		}
	})
	.then(function(user) {
		user.createShower(req.body)
	})
	.then(function(shower) {
		res.status(200)
		res.send(shower)
	})
})