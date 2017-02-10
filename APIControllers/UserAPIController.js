var User = require('../models/user');
var Adventure = require('../models/adventure');
var Booking = require('../models/booking');
module.exports = {
    save:function(req, res){
        var user = new User({
            full_name:req.body.full_name,
            email: req.body.email,
            full_address:req.body.full_address,
            password:req.body.password,
            contact_number:req.body.contact_number,
            state:req.body.state,
            device_id:req.body.device_id
        });
        user.save(function(err){
            if(!err){
                res.json(user);
            } else {
                res.status(400).send({ error: err });
            }
        })
    },
    list:function(req,res){
         User.find({},function(err,users){
              res.json(users);
         })
    },
    get:function(req,res){
        var query = User.findOne({ '_id': req.params.id });
        query.exec(function(err,user){
            if(!err){
                res.json(user);
            } else {
                res.status(404).send();
            }
        })
    },
    update:function(req,res){
        User.findOneAndUpdate({_id:req.params.id}, req.body, {new: true}, function (err, user) {
            if(!err){
                res.json(user);
            } else {
                res.status(400).send({ error: err });
            }

        });
    },
    book:function(req,res){
      Adventure.findOne({_id:req.params.tourID}, function(err,adventure){
        var booking_date = req.body.booking_date;
        var day = moment(booking_date);
        var schedule = adventure.schedule;
        var isAvailable = false;
        if (booking_date == '' || typeof booking_date == 'undefined') {
          res.status(400).send({ "error": "Booking date missing" });
          return;
        }
        for(var i = 0; i < schedule.length; i++){
          if (day.isSame(moment(schedule[i]))) {
            isAvailable = true;
            break;
          }
        }
        if (isAvailable) {
          res.json({});
        } else {
          res.status(404).send({ "error": "This date is not available" });
        }

      });
    },
    login: function(req,res){
      var query = User.findOne({"email":req.body.email, "password":req.body.password});
      console.log(req.body)
      query.exec(function(err,user){
          if(!err){
              if (user) {
                User.findOneAndUpdate({_id: user._id}, {$set: { "device_id" : req.body.device_id }},{"new":true},function(err, doc){
                    if(err){
                        console.log("Something wrong when updating data!");
                    }
                    res.json(doc);
                });
                //I dont know what is going on
              } else {
                res.status(403).send();
              }
          } else {
              res.status(403).send();
          }
      })
    }

}
