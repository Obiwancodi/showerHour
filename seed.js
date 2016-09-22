/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Bathroom = db.model('bathroom')
var Shower = db.model('shower')
var Promise = require('sequelize').Promise;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var seedUsers = function () {

    var users = [
        {
            name: "Whatup",
            email: 'testing@fsa.com',
            password: 'password',
            number: 123456789

        },
        {   
            name:"Yeah Buddy",
            email: 'obama@gmail.com',
            password: 'potus',
            number: 123456789
        },
        {
            name: "What",
            email: 'test@fsa.com',
            password: 'password',
            number: 1234589
        },

        {
            name: "YesSirt",
            email: 'test1@fsa.com',
            password: 'password',
            number: 8675309
        },

        {
            name: "Sharon Cox",
            email: "test2@fsa.com",
            password: 'pass',
            number: 767676767
        }

    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers)
    .then(function(users) {
        
        var manyUsers = users.map(function(userObj) {
            return userObj.setBathrooms([getRandomInt(1,3)])
        })
        return Promise.all(manyUsers) 
    }) 

};


var seedBathroom = function() {
    var bathrooms = [
    {
        name: "3rd floor bathroom",
        floor: 3
    },

    {
        name: "2rd floor bathroom",
        floor: 2
    },
    {
        name: "ground floor bathroom",
        floor: 0
    }
    ];

    var creatingBathrooms = bathrooms.map(function (bathroomObj) {
        return Bathroom.create(bathroomObj);
    });

    return Promise.all(creatingBathrooms)
    // .then(function(bathrooms) {
    //         return Promise.all(
                
    //             bathrooms.map(function(bathroom) {
    //                 return bathroom.createShower()
    //             })
    //         )

    //     })
    //     .then(function(showers) {
    //         console.log("WOOT", showers)
    //         return showers
    //     })

}

var setTime = function() {
    return Shower.findAll({})
    .then(function(showers) {
        console.log("work",showers)
        var smelly = showers.map(function(shower) {
            return shower.update({
                showerTime : new Date()
            })
        })
        return Promise.all(smelly)
    })
}


db.sync({force:true})
    .then(function() {
        return seedBathroom();
    })
    .then(function (bathrooms) {
        return seedUsers();
    })
    .then(function() {
        return setTime();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
