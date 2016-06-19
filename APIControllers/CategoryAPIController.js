var AWS = require('aws-sdk'),
    fs = require('fs');
var shortid = require('shortid');
var Category = require('../models/category');
module.exports = {    
    list: function(req, res){
        Category.find({},function(err,categories){
              res.json(categories);
         })
    },
    get: function(req,res){
        Category.findOne({_id:req.params.id},function(err,categories){
              res.json(categories);
         })
    },
    save: function(req,res){
        var category = new Category({"name":req.body.name, "image":null });
        category.save(function(err){
            if(!err){               
                var buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ""),'base64')    
                var key = "images/" + req.body.name.replace(/\s/g, "")  + shortid.generate()
                var s3 = new AWS.S3({params: {Bucket: 'pono-adventure-s3', Key: key, ContentType: "image/png"}});
                s3.upload({Body: buf}, function(err, data) {
                    if(!err){
                        console.log(data);
                        category.image = data.Location;
                        category.save(function(err){
                            res.json(category);
                        });                            
                    } else {
                        res.json(err);
                    }
                                       
                });
                            
            } else {
                res.json(err);
            }
        })                
    },
    delete: function(req,res){
        Category.remove({"_id":req.params.id}, function(err, removed){
            if(err){
                res.status(400).send(err);
            } else {
                if(removed.n == 0){
                    res.status(404).send();
                } else {
                    res.json(removed);
                }
            }
        })
    }
    
}
