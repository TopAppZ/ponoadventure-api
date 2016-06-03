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
    save: function(req,res){
        AWS.config.update({region: 'us-west-2'});
        AWS.config.update({accessKeyId: 'AKIAI5KVUNEOEWATYJNQ', secretAccessKey: '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'});
        var category = new Category({"name":req.body.name, "image":null });
        category.save(function(err){
            if(!err){
                var fileStream = fs.createReadStream(req.file.path);
                fileStream.on('error', function (err) {
                    if (err) { res.send(err); }
                });  
                fileStream.on('open', function () {
                    var key = "images/" + req.body.name.replace(/\s/g, "")  + shortid.generate()
                    var s3 = new AWS.S3({params: {Bucket: 'pono-adventure-s3', Key: key, ContentType: req.file.mimetype}});
                    s3.upload({Body: fileStream}, function(err, data) {
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
                });                
            } else {
                res.json(err);
            }
        })                  
        
    }
        
       
}