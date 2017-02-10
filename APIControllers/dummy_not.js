var apn = require('apn');
var path = require('path');
var User = require('../models/user');
var Adventure = require('../models/adventure');
var _ = require('underscore');
var moment = require('moment');
var mongoose = require('mongoose');
module.exports = {
    send:function(req, res){
    	var foo = function(){
    		return new Promise(function(resolve,reject){
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
		              		var self = this;
		              		self.adventures = adventures;             		           		
		              		var noOfAdventures = adventures.length; 
		              		self.finalNotificationCount = adventures.length; 

		              		self.device_id = "";            		
		              		for(i = 0; i < noOfAdventures; i++){
		              			self.adventure = adventures[i];
		              			var query = User.findOne({"_id":req.body._id},{"notifications":{$elemMatch:{"place_id":adventures[i]._id, "time_stamp":moment().format("MMM Do YY")}}},function(err,user){                 				        				
		              				if (user.notifications.length == 0) {
		              					User.findOneAndUpdate({_id: user._id}, {$push:{notifications:{place_id:self.adventure._id}}}, {new: true}, function(err, doc){
										    if(err){
										        console.log("Something wrong when updating data!");
										    }
										});
		              				} else {
		              					self.finalNotificationCount--;		              					
		              					
		              				}
		              			})

		              			if (i == noOfAdventures) {
		              				return self.finalNotificationCount;
		              				console.log("Here");
		              			} else {
		              				return 0;
		              			}
		              		}              		
		              		
		              }
		        );
    		});
    	}
    	var task1 = foo();
    	var task2 = task1.then(function(count){
    		console.log(count);
    	})
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