var express = require('express');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var config = require('./config');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var app = express();
mongoose.connect(config.database, {auth:{authdb:"admin"}}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('connection successful');
    }
})
app.use(bodyParser.json({limit: '50MB'}));
app.use(bodyParser.urlencoded({limit: '50MB', extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!", resave:true, saveUninitialized:true, path: '/' }));

var router = require('./router')(express, app);
app.listen(config.port, function(){
	console.log("Running on port using gulp: " + config.port);
});
