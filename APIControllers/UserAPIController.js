var User = require('../models/user');
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
    }
}