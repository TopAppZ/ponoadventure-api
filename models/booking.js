var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    full_name: {type:String, required:true},
    email: {type:String, required:true},
    contact_number: {type:String, required: true},
    age: {type:String, required: true},
    number_of_person: {type:String, required: true},
    gender: {type:String, required: true},
    can_swim: {type:Boolean, required: true},
    strenious_activity_rate: {type:String, required: true},
    transaction_id: {type:String, required: true},    
    transaction_date: {type:Date, default:Date.now()},
    booking_date: {type:Date, required: true},
    total_price: {type:Date, required: true},
    booked_by: {type: Schema.Types.ObjectId, ref: 'User'},
    place_id: {type: Schema.Types.ObjectId, ref: 'Adventure'},
});
module.exports = mongoose.model('Booking', bookingSchema);