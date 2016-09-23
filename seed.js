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
            number: 18144940722

        },
        {   
            name:"Yeah Buddy",
            email: 'obama@gmail.com',
            password: 'potus',
            number: 18144940722
        },
        {
            name: "What",
            email: 'test@fsa.com',
            password: 'password',
            number: 18144940722
        },

        {
            name: "YesSirt",
            email: 'test1@fsa.com',
            password: 'password',
            number: 18045649949
        },

        {
            name: "Sharon Cox",
            email: "test2@fsa.com",
            password: 'pass',
            number: 18045649949
        }

    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers)

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


var seedShower = function() {
    var twentyMinutesLater = new Date();
    var fun = twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
    var showers = [
    {
        showerTime: new Date(),
        endTime: fun,
        userId: 1,
        bathroomId: 1,
        fiveText: false,
        nowText: false,
        endText: false
    },

    {
        showerTime: new Date(),
        endTime: fun,
        userId: 1,
        bathroomId: 1,
        fiveText: false,
        nowText: false,
        endText: false

    },
    {
        showerTime: new Date(),
        endTime: fun,
        userId : 2,
        bathroomId: 3,
        fiveText: false,
        nowText: false,
        endText: false
    },
    {
        showerTime: new Date(),
        endTime: fun,
        userId : 5,
        bathroomId: 3,
        fiveText: false,
        nowText: false,
        endText: false
    }
    ]

    var creatingShowers = showers.map(function (showerObj) {
        return Shower.create(showerObj);
    });

    return Promise.all(creatingShowers)
        // .then(function(showers) {
        //     console.log(showers)
        //     var smelly = showers.map(function(shower) {
        //         shower.setUser(getRandomInt(1,5))
        //         .then(function(shower) {
        //             shower.setBathroom(getRandomInt(1,3))
        //         })
        //     })
        // })
        // return Promise.all(smelly)
}



// var setTime = function() {
//     return Shower.findAll({})
//     .then(function(showers) {
//         console.log("work",showers)
//         var smelly = showers.map(function(shower) {
//             var twentyMinutesLater = new Date();
//             var fun = twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
//             return shower.update({
//                 showerTime : new Date(),
//                 endTime : fun 
//             })
//         })
//         return Promise.all(smelly)
//     })
// }


db.sync({force:true})
    .then(function() {
        return seedBathroom();
    })
    .then(function (bathrooms) {
        return seedUsers();
    })
    .then(function() {
        return seedShower();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
