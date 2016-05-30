var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    full_name: String,
    email: {type:String, required:true, index:{unique:true}},
    password: {type: String, required: true, select: true},
    contact_number: {type:String, required: true},
    state: {type:Number, required: true, default:2},
    last_login: {type:Date, default:null},
    date_of_signup: {type:Date, default:Date.now()},
    last_updated: {type:Date, default:Date.now()}
});

module.exports = mongoose.model('User', userSchema);