var AWS = require('aws-sdk'),
    fs = require('fs');
var shortid = require('shortid');
var User = require('../models/user');
var Adventure = require('../models/adventure');
module.exports = {
    save:function(req,res){

        var adventure = new Adventure(req.body);
        adventure.save(function(err){
            if(!err){
                if (typeof(req.body.img) != 'undefined' ) {
                    var buf = new Buffer(req.body.img.replace(/^data:image\/\w+;base64,/, ""),'base64')    
                    var key = "images/" + req.body.name.replace(/\s/g, "")  + shortid.generate()
                    var s3 = new AWS.S3({params: {Bucket: 'pono-adventure-s3', Key: key, ContentType: "image/png"}});
                    s3.upload({Body: buf}, function(err, data) {
                        if(!err){
                            console.log(data);
                            adventure.image = data.Location;
                            adventure.save(function(err){
                                res.json(adventure);
                            });                            
                        } else {
                            res.json(err);
                        }
                                           
                    });
                } else {
                    res.json(adventure);
                }                
            } else {
                res.status(400).send(err);
            }
        });
    },
    list:function(req,res){
        Adventure.find(req.query)
            .populate('reviews.posted_by','_id full_name')            
            .exec(function(error, adventures) {
                res.json(adventures);
            })
    },
    get:function(req,res){
        Adventure.findOne({"_id":req.params.id})
            .populate('reviews.posted_by','_id full_name')            
            .exec(function(error, adventures) {
                res.json(adventures);
            })
    },
    update: function(req,res){
        console.log(req.body);
        if (req.body.imgChanged == 0) {
            Adventure.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators: true, new:true}, function (err, adventure) {
                if(!err){
                    res.json(adventure);
                } else {
                    res.status(400).send({ error: err });
                }
            })
        } else {            
            Adventure.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators: true,new:true }, function (err, adventure) {
                if(!err){
                    if (typeof(req.body.img) != 'undefined' ) {
                        var buf = new Buffer(req.body.img.replace(/^data:image\/\w+;base64,/, ""),'base64')    
                        var key = "images/" + req.body.name.replace(/\s/g, "")  + shortid.generate()
                        var s3 = new AWS.S3({params: {Bucket: 'pono-adventure-s3', Key: key, ContentType: "image/png"}});
                        s3.upload({Body: buf}, function(err, data) {
                            if(!err){
                                console.log(data);
                                adventure.image = data.Location;
                                adventure.save(function(err){
                                    res.json(adventure);
                                });                            
                            } else {
                                res.json(err);
                            }
                                               
                        });
                    } else {
                        res.json(adventure);
                    }
                } else {
                    res.status(400).send({ error: err });
                }
            })

        }
    }
}