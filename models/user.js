var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    full_name: String,
    email: {type:String, required:true, index:{unique:true}},
    password: {type: String, required: true, select: false},
    contact_number:{type:String, required: true}
});

module.exports = mongoose.model('User', userSchema);