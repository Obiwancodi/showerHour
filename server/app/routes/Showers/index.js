'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let User = require('../../../db/models/user.js')
var Bathroom = require('../../../db/models/bathroom.js')
var Shower = require('../../../db/models/shower.js')
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
console.log("FUKC",TOKEN_PATH)

// Load client secrets from a local file.
// fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Google Calendar API.
//   authorize(JSON.parse(content), listEvents);
// });

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback,events) {
	console.log("loook at me",credentials.web.client_id)
  var clientSecret = credentials.web.client_secret;
  // console.log(credentials.)
  var clientId = credentials.web.client_id;
  var redirectUrl = 'http://127.0.0.1:1337/auth/google/callback';
  var auth = new googleAuth();
  // console.log(auth)
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH,'utf8',function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback, events);
    } else {
      console.log("token", token)
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client,events);
    }
  });
}

// *
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  *
//  * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback to call with the authorized
//  *     client.
 
function getNewToken(oauth2Client, callback, events) {
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
      console.log("LOOK A", token)
      callback(oauth2Client,events);
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
function listEvents(auth, event) {
  var calendar = google.calendar('v3');
   console.log("BOOBGER",auth)
  calendar.events.insert({
  auth: auth,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
  	 console.log(err)
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});
}




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
		// console.log(showers)
		res.send(showers)
	})
})


router.post('/',function(req,res,next) {
	var calendar = google.calendar('v3');
	var time = req.body.showerTime[0] + "T" + req.body.showerTime[1]
	console.log(time)
	 console.log(req.body)
	
	var twentyMinutesLater = new Date(time);
	var fun = twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
  var cool = new Date(fun)
  cool= cool.toISOString() 
  cool = cool.substring(0, cool.length - 5)
  console.log(cool)

	var event = {
  'summary': 'A Shower',
  'location': req.body.bathroom.name + '',
  'description': 'Your chance to stop smelling like BO',
  'start': {
    'dateTime': req.body.showerTime[0] + "T" + req.body.showerTime[1],
    'timeZone': 'America/New_York',
  },
  'end': {
    'dateTime': cool,
    'timeZone': 'America/New_York',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'gflemingiii@gmail.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};
	fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents, event);
});
	// console.log(req.body.showerTime[0])
	// console.log(req.session, "adsfdsds")
  console.log(req.session.passport.user)
	Shower.create({
		bathroomId : req.body.bathroom.id,
		userId : req.session.passport.user,
		showerTime: time,
		endTime: fun,
		fiveText : false,
		nowText: false,
		endText: false
	})
	.then(function(shower) {
		res.status(200)
		res.send(shower)
	})
	.catch(function(error) {
		console.log(error)
	})
})

