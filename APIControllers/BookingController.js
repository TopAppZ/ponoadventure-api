var User = require('../models/user');
var Adventure = require('../models/adventure');
var Booking = require('../models/booking');
var moment = require('moment');
module.exports = {
  list:function(req,res){
    Booking.find({},function(err,bookings){
         res.json(bookings);
    }).populate('booked_by').populate('place_id').sort('-transaction_date')
  },
  get:function(req,res){
    Booking.findOne({_id:req.params.id},function(err,booking){
         res.json(booking);
    }).populate('booked_by').populate('place_id')
  }

}
