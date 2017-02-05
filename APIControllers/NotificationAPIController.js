var apn = require('apn');
var path = require('path');
var User = require('../models/user');
var Adventure = require('../models/adventure');
var _ = require('underscore');
var moment = require('moment');
var mongoose = require('mongoose');
module.exports = {
    send:function(req, res){ 	
    		
			Adventure.aggregate(
	          [
	            { "$geoNear": {
	                "near": {
	                  "type": "Point",
	                  "coordinates": [ req.body.location.lon, req.body.location.lat ]
	                },
	                "maxDistance": 5000,
	                "spherical": true,
	                "distanceField": "dis",
	                "distanceMultiplier":1/1000,
	                "query":{},
	            }},
	            { "$sort": { "dis": 1 } } 

	          ],function(err,adventures){	          	
	      		User.findOne({"_id":req.body._id}, function(err, user){	      			
	      			let device_id = user.device_id;
	      			let notifications = user.notifications;	 
	      			let placeCountforNotification = adventures.length;
	      			for(var i = 0; i < adventures.length; i++){
	      				var elem = _.filter(notifications,function(notification){
		      				return notification.place_id.toString() === adventures[i]._id.toString() && notification.time_stamp == moment().format("MMM Do YY");
		      			});
		      			console.log(elem);
		      			if (elem.length) {
		      				placeCountforNotification--;
		      			} else {
		      				//insert the place_id with time stamp into the array
		      				User.findOneAndUpdate({_id: user._id}, {$push:{notifications:{place_id:adventures[i]._id}}}, {new: true}, function(err, doc){
							    if(err){
							        console.log("Something wrong when updating data!");
							    }							    
							});

		      			}
	      			}
	      			if (placeCountforNotification != 0) {
		      			let tokens = [device_id];
				    	var options = {
						  key:"key.pem",
						  production: false,
						};
		      			var apnProvider = new apn.Provider(options);
		      			var alert = placeCountforNotification + " Place(s) within 5KM of your location";
						let note = new apn.Notification({
							alert:  alert,
						});
						note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
						note.badge = 3;
						note.sound = "ping.aiff";
						note.topic = "com.ai.ponoadventure";

						apnProvider.send(note, tokens).then( result => {
							console.log(result);
						    console.log("sent:", result.sent.length);
						    console.log("failed:", result.failed.length);
						    console.log(result.failed);
						    res.json({"msg":alert,"result":result});
						});					
						apnProvider.shutdown();
					} else {
						res.json({"result":"No places near by for now"});
					}
	      		})	              		              		
	          		
	          }
	    );
    		
    	    	
    }
    
}
















    	/*var query = User.findOne({ '_id': req.body._id });
        query.exec(function(err,user){
            Adventure.aggregate(
	              [
	                { "$geoNear": {
	                    "near": {
	                      "type": "Point",
	                      "coordinates": [ req.body.location.lon, req.body.location.lat ]
	                    },
	                    "maxDistance": 5000,
	                    "spherical": true,
	                    "distanceField": "dis",
	                    "distanceMultiplier":1/1000,
	                    "query":{},
	                }},
	                { "$sort": { "dis": 1 } } 

	              ],function(err,adventures){
	              		var noOfAdventures = adventures.length;
	                    if (noOfAdventures) {
	                    	for (var i = 0; i < noOfAdventures; i++){
	                    		var query = User.findOne({})
	                    		/*if (q.length == 0) {
	                    			User.findOneAndUpdate({_id: user._id}, {$push:{notifications:{place_id:adventures[i]._id}}}, {new: true}, function(err, doc){
									    if(err){
									        console.log("Something wrong when updating data!");
									    }
									    //console.log(doc);
									});

	                    		}
	                    		
	                    	}
	                    }
	              }
	        ); 

        })	

		var apnProvider = new apn.Provider(options);

		let note = new apn.Notification({
			alert:  "Place 1 is within 5KM of your location",
		});
		note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
		note.badge = 3;
		note.sound = "ping.aiff";
		note.topic = "com.ai.ponoadventure";

		apnProvider.send(note, tokens).then( result => {
			console.log(result);
		    console.log("sent:", result.sent.length);
		    console.log("failed:", result.failed.length);
		    console.log(result.failed);
		});
		res.json(req.body);
		apnProvider.shutdown();*/