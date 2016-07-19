var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adventureSchema = new Schema({
    name: {type:String, required:[true,'Name is required']},
    address_1: {type: String, required:[true, 'Address line 1 is required']},
    address_2: { type: String, default: "NA" },
    city: {type:String, required:[true, 'City is required']},
    state: {type:String, required:[true, 'State is required']},
    country: {type:String, required:[true, 'Country is required']},
    zip: {type:String, required:[true, 'Zip code is required']},
    category:{type:String, required:[true, 'Category is required']},
    location: {type: { type: String, default:'Point' }, coordinates: [Number] },
    image:{ type: String, default: "NA" },
    price: { type: String, default: "NA" },
    description: { type: String, default: "NA" },
    video_url: { type: String, default: "NA" },
    schedule: [],
    reviews:[{content:String, rating:Number, posted_by: {type: Schema.Types.ObjectId, ref: 'User'}, time_stamp:{type:Date, default:Date.now()}}],
    last_updated: {type:Date, default:Date.now()},
    
});
adventureSchema.path('schedule').validate(function(value) {
  return value.length;
},"Schedule cannot be empty");
module.exports = mongoose.model('Adventure', adventureSchema);