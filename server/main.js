'use strict';
var chalk = require('chalk');
var db = require('./db');
var CronJob = require('cron').CronJob;
var Shower = require('./db/models/shower')
var User = require('./db/models/user')
var client = require('twilio')('AC4d1a67e40cc9cf2f5e3bf367508c140b', 'af6e320513c474d4913620d3b735a770');

// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app')(db);
    server.on('request', app); // Attach the Express application.
    require('./io')(server);   // Attach socket.io.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};


var job = new CronJob('*/10 * * * * *', function() {
	var work = new Date();
    work.setMinutes(work.getMinutes() + 5)
    console.log(work)
	
	Shower.findAll({
		where : {
			showerTime:{
				$lte : work
			},
			fiveText: false
		}
	})
	.then(function(showers) {
		var showerPromise = showers.map(function(shower) {
			return shower.update({
				fiveText: true
			})
			.then(function(shower) {
				// console.log(shower)
				return User.findOne({
					where: {
						id: shower.dataValues.userId
					}
				})
			})
			
			.then(function(user) {
				console.log("wort",user.number)
				client.sendMessage({
				    to: "+" + user.number, // Any number Twilio can deliver to
				    from: '+12409794395', // A number you bought from Twilio and can use for outbound communication
				    body: '5 Minutes till your shower you dirty garden tool' // body of the SMS message

				}, function(err, responseData) { //this function is executed when a response is received from Twilio

				    if (!err) { // "err" is an error received during the request, if any

				        // "responseData" is a JavaScript object containing data received from Twilio.
				        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
				        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

				        console.log(responseData.from); // outputs "+14506667788"
				        console.log(responseData.body); // outputs "word to your mother."

				    }
				});
			})
		})
		return Promise.all(showerPromise)
	
		
	})

var now = new Date()
	
	Shower.findAll({
		where : {
			showerTime:{
				$lte : work
			},
			fiveText: true,
			nowText: false
		}
	})
	.then(function(showers) {
		var showerPromise = showers.map(function(shower) {
			return shower.update({
				nowText: true
			})
			.then(function(shower) {
				// console.log(shower)
				return User.findOne({
					where: {
						id: shower.dataValues.userId
					}
				})
			})
			
			.then(function(user) {
				console.log("now",user.number)
				client.sendMessage({
				    to: "+" + user.number, // Any number Twilio can deliver to
				    from: '+12409794395', // A number you bought from Twilio and can use for outbound communication
				    body: 'Its your shower time. Time to get... clean!' // body of the SMS message

				}, function(err, responseData) { //this function is executed when a response is received from Twilio

				    if (!err) { // "err" is an error received during the request, if any

				        // "responseData" is a JavaScript object containing data received from Twilio.
				        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
				        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

				        console.log(responseData.from); // outputs "+14506667788"
				        console.log(responseData.body); // outputs "word to your mother."

				    }
				});
			})
		})
		return Promise.all(showerPromise)
	
		
	})


var now = new Date()
	
	Shower.findAll({
		where : {
			endTime:{
				$lte : now
			},
			fiveText: true,
			nowText: true,
			endText: false
		}
	})
	.then(function(showers) {
		var showerPromise = showers.map(function(shower) {
			return shower.update({
				endText: true
			})
			.then(function(shower) {
				// console.log(shower)
				return User.findOne({
					where: {
						id: shower.dataValues.userId
					}
				})
			})
			
			.then(function(user) {
				console.log("now",user.number)
				client.sendMessage({
				    to: "+" + user.number, // Any number Twilio can deliver to
				    from: '+12409794395', // A number you bought from Twilio and can use for outbound communication
				    body: 'GET OUT OF THE BATHROOM!' // body of the SMS message

				}, function(err, responseData) { //this function is executed when a response is received from Twilio

				    if (!err) { // "err" is an error received during the request, if any

				        // "responseData" is a JavaScript object containing data received from Twilio.
				        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
				        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

				        console.log(responseData.from); // outputs "+14506667788"
				        console.log(responseData.body); // outputs "word to your mother."

				    }
				});
			})
		})
		return Promise.all(showerPromise)
	
		
	})

},
function () {
    //console.log("works!")
  },
  true /* Start the job right now */
  )





var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}



db.sync()
.then(createApplication)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
});
