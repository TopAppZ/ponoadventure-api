var mongoose = require('mongoose');
var moment = require('moment');
require('mongoose-moment')(mongoose);
var Schema = mongoose.Schema;
var Adventure = require('../models/adventure');
var userSchema = new Schema({
    full_name: {type:String, required: true},
    email: {type:String, required:true, index:{unique:true}},
    password: {type: String, required: true},
    contact_number: {type:String, required: true},
    full_address:{type:String, required: true},
    state: {type:Number, required: true, default:2},
    last_login: {type:Date, default:Date.now()},
    date_of_signup: {type:Date, default:Date.now()},
    last_updated: {type:Date, default:Date.now()},
    device_id:{type:String},
    notifications:[{"place_id":{type: Schema.Types.ObjectId, ref: 'Adventure'}, "time_stamp":{type:String, default:moment().format('MMM Do YY') }}]
});
module.exports = mongoose.model('User', userSchema);
