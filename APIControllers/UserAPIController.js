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
            if(err){
                res.send(err);
            } else {
                res.json({"status":1, "msg":"success", "user":user});
            }
        })
    },
    list:function(req,res){
         User.find({},function(err,users){
              res.json(users);
         })
    }
}