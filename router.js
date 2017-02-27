var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var auth = require('basic-auth')
module.exports = function(express, app){
    ///////////////////////////////////////////////////////API router/////////////////////////////////////////////////////
    var apiRouter = express.Router();
    apiRouter.route('/version')
        .get(function(req,res){
            res.json({version:"1.0.0"});
            req.session.c = "hello";
        });

    apiRouter.route('/user')
        .get(function(req,res){
            var userAPIController = require('./APIControllers/UserAPIController');
            userAPIController.list( req, res );
        })
        .post(function(req,res){
            var userAPIController = require('./APIControllers/UserAPIController');
            userAPIController.save( req, res );
        })
    apiRouter.route('/user/:id')
        .get(function(req,res){
            var userAPIController = require('./APIControllers/UserAPIController');
            userAPIController.get( req, res );
        })
        .put(function(req,res){
            var userAPIController = require('./APIControllers/UserAPIController');
            userAPIController.update( req, res );
        })
    apiRouter.route('/user/getByEmail')
        .post(function(req,res){
            var userAPIController = require('./APIControllers/UserAPIController');
            userAPIController.getByEmail( req, res );
        })
    apiRouter.route('/user/login')
        .post(function(req,res){
            var userAPIController = require('./APIControllers/UserAPIController');
            userAPIController.login( req, res );
        })
    apiRouter.route('/user/:id/book/:tourID')
        .post(function(req,res){
            var userAPIController = require('./APIControllers/UserAPIController');
            userAPIController.book( req, res );
        })
    apiRouter.route('/adventure')
        .post(function(req,res){
            var adventureAPIController = require("./APIControllers/AdventureAPIController");
            adventureAPIController.save(req,res);
        })
        .get(function(req,res){
            var adventureAPIController = require("./APIControllers/AdventureAPIController");
            adventureAPIController.list(req,res);
        })
    apiRouter.route('/adventure/:id')
        .get(function(req,res){
            var adventureAPIController = require("./APIControllers/AdventureAPIController");
            adventureAPIController.get(req,res);
        })
        .put(function(req,res){
            var adventureAPIController = require("./APIControllers/AdventureAPIController");
            adventureAPIController.update(req,res);
        })
    apiRouter.route('/adventure/direction')
        .post(function(req,res){
            var adventureAPIController = require("./APIControllers/AdventureAPIController");
            adventureAPIController.direction(req,res);
         })
    apiRouter.route('/category')
        .get(function(req, res){
            var categoryAPIController = require("./APIControllers/CategoryAPIController");
            categoryAPIController.list(req,res);
        })
        .post(function(req, res){
            var categoryAPIController = require("./APIControllers/CategoryAPIController");
            categoryAPIController.save(req,res);
        })

    apiRouter.route('/category/:id')
        .get(function(req,res){
            var categoryAPIController = require("./APIControllers/CategoryAPIController");
            categoryAPIController.get(req,res);
        })
        .delete(function(req,res){
            var categoryAPIController = require("./APIControllers/CategoryAPIController");
            categoryAPIController.delete(req,res);
        })
    apiRouter.route('/notification')
        .post(function(req, res){
            var notificationController = require("./APIControllers/NotificationAPIController");
            notificationController.send(req,res);
        })
    apiRouter.route('/booking')
        .get(function(req, res){
            var bookingController = require("./APIControllers/BookingController");
            bookingController.list(req,res);
        })
    apiRouter.route('/booking/:id')
        .get(function(req, res){
            var bookingController = require("./APIControllers/BookingController");
            bookingController.get(req,res);
        })
    app.use('/api', apiRouter);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////Admin Router/////////////////////////////////////////////////////////
    var adminRouter = express.Router();
    adminRouter.route('*')
        .get(function( req, res ){
          var user = auth(req);
          if(user && (user.name == "admin" && user.pass == "harry123")){
              res.sendFile(__dirname + '/public/admin.html');
          } else {
             res.statusCode = 401;
             res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required 1');
             res.end('Unauthorized');
          }
        });
    app.use(express.static(__dirname + '/public'));
    app.use('/admin', adminRouter);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var logoutRouter = express.Router();
    logoutRouter.route('*')
      .get(function(req,res){
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required 1');
        res.end('Unauthorized');
        res.redirect("/admin/home")
      })
    app.use('/logout', logoutRouter);
}
