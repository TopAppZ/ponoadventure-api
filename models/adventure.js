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
    coord: {
        latitude: { type: String, default: "0.0" },
        longitude: { type: String, default: "0.0" },        
    },
    image:{ type: String, default: "NA" },
    price: { type: String, default: "NA" },
    description: { type: String, default: "NA" },
    video_url: { type: String, default: "NA" },
    reviews:[{content:String, rating:Number, posted_by: {type: Schema.Types.ObjectId, ref: 'User'}, time_stamp:{type:Date, default:Date.now()}}],
    last_updated: {type:Date, default:Date.now()},
    
});
module.exports = mongoose.model('Adventure', adventureSchema);