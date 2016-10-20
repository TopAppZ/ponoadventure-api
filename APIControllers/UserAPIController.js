var User = require('../models/user');
var Adventure = require('../models/adventure');
var Booking = require('../models/booking');
var moment = require('moment');
module.exports = {    
    save:function(req, res){        
        var user = new User({
            full_name:req.body.full_name,
            email: req.body.email,
            password:req.body.password,
            contact_number:req.body.contact_number
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
            var day = moment(booking_date).format('dddd').toLowerCase();
            var schedule = adventure.schedule;
            var isAvailableAtRepeat = false;
            var isAvailableAtDate = false;
            for (var i = 0; i < schedule.length; i++){
                if (schedule[i].type == 'repeat') {
                    if (schedule[i].repeatative_days.indexOf(day) > -1 && schedule[i].except.indexOf(booking_date) == -1) {
                        isAvailableAtRepeat = true;                         
                    } else {
                        isAvailableAtRepeat = false;
                    }        
                                  
                } else if (schedule[i].type == 'date') {
                    if (schedule[i].dates.indexOf(booking_date) > -1) {
                        isAvailableAtDate = true;  
                        console.log("l i 3");                       
                    } 

                }
            }
            var isAvailable = isAvailableAtDate || isAvailableAtRepeat;
            if (!isAvailable) {
                res.status(404).send({ error: "The selected date is not available" });
            } else {
                var booking = new Booking({
                    full_name: req.body.full_name,
                    email: req.body.email,
                    contact_number: req.body.contact_number,
                    age: req.body.age,
                    number_of_person: req.body.number_of_person,
                    gender: req.body.gender,
                    can_swim: req.body.can_swim,
                    strenious_activity_rate: req.body.strenious_activity_rate,
                    transaction_id: req.body.transaction_id,    
                    booking_date: req.body.booking_date,
                    total_price: req.body.total_price,
                    booked_by: req.params.id,
                    place_id: req.params.tourID,
                });
                res.send({ error: "The selected date is available" });
            }
        })
    }
}