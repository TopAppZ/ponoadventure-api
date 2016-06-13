var User = require('../models/user');
var Adventure = require('../models/adventure');
module.exports = {
    save:function(req,res){
        var adventure = new Adventure(req.body);
        adventure.save(function(err){
            if(!err){                
                res.json(adventure);
            } else {
                res.status(400).send(err);
            }
        });
    },
    list:function(req,res){
        Adventure.find({})
            .populate('reviews.posted_by','_id full_name')            
            .exec(function(error, adventures) {
                res.json(adventures);
            })
    }
}