var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adventureSchema = new Schema({
    name: {type:String, required:true},
    address_1: {type: String, required:true},
    address_2: String,
    city: {type:String, required:true},
    state: {type:String, required:true},
    country: {type:String, required:true},
    zip: {type:String, required:true},
    category:{type:String, required:true},
    coord: {
        latitude: String,
        longitude: String,        
    },
    image:String,
    video_url: String,
    reviews:[{content:String, rating:Number, posted_by: {type: Schema.Types.ObjectId, ref: 'User'}, time_stamp:{type:Date, default:Date.now()}}],
    last_updated: {type:Date, default:Date.now()},
    
});
module.exports = mongoose.model('Adventure', adventureSchema);