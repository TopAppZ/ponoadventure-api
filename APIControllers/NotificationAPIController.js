var apn = require('apn');
var path = require('path');
module.exports = {
    send:function(req, res){
    	let tokens = ["16F80029652C67EA2F6C1DE03B5D9CA153D03C112BD24336BEF18169BFCC4371"];
    	var options = {
		  key:"key.pem",
		  production: false,
		};

		var apnProvider = new apn.Provider(options);

		let note = new apn.Notification({
			alert:  "Place 1 is within 5KM of your location",
		});
		note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
		note.badge = 3;
		note.sound = "ping.aiff";
		note.topic = "com.ai.ponoadventure";

		apnProvider.send(note, tokens).then( result => {
		    console.log("sent:", result.sent.length);
		    console.log("failed:", result.failed.length);
		    console.log(result.failed);
		});
		apnProvider.shutdown();
    }
}