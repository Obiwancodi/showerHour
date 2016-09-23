var client = require('twilio')('AC4d1a67e40cc9cf2f5e3bf367508c140b', 'af6e320513c474d4913620d3b735a770');

//Send an SMS text message
console.log("hello")
client.sendMessage({
    to:'+18144940722', // Any number Twilio can deliver to
    from: '+12409794395', // A number you bought from Twilio and can use for outbound communication
    body: 'BIG FUN' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }
});
