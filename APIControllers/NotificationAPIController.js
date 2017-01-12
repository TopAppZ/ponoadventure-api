var apn = require('apn');
var path = require('path');
var options = {
  token: {
    key: path.join(__dirname, "../WePono_push.pem"),
    keyId: "T0K3NK3Y1D",
    teamId: "T34M1D",
  },
  production: false,
};

var apnProvider = new apn.Provider(options);
module.exports = {
    send:function(req, res){
    	/*let deviceToken = "34B6AAD27E5278DF41F2B8648968D00F6DEA2B51C10B4A0DA7DAE636C38FEE88"
    	var note = new apn.Notification();
		note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
		note.badge = 3;
		note.sound = "ping.aiff";
		note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
		note.payload = {'messageFrom': 'John Appleseed'};
		note.topic = "com.ai.ponoadventure";*/
		/*apnProvider.send(note, deviceToken).then( (result) => {
		  console.log(result);
		});*/
    }
}