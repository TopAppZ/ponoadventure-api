var express = require('express');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var config = require('./config');
var mongoose = require('mongoose');
var app = express();
mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('connection successful');
    }
})
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var router = require('./router')(express, app);
app.listen(config.port, function(){
	console.log("Running on port using gulp: " + config.port);
});