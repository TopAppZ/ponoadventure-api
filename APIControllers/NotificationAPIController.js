var apn = require('apn');
var path = require('path');
module.exports = {
    send:function(req, res){
    	let tokens = ["34B6AAD27E5278DF41F2B8648968D00F6DEA2B51C10B4A0DA7DAE636C38FEE88"];
    	var options = {
		  key:"key.pem",
		  production: false,
		};

		var apnProvider = new apn.Provider(options);

		let note = new apn.Notification({
			alert:  "Push without cert",
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