module.exports = function(express, app){
    ///////////////////////////////////////////////////////API router/////////////////////////////////////////////////////
    var apiRouter = express.Router();
    apiRouter.route('/version')
        .get(function(req,res){
            res.json({version:"1.0.0"});
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
    app.use('/api', apiRouter);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /////////////////////////////////////////////////Admin Router/////////////////////////////////////////////////////////
    var adminRouter = express.Router();
    adminRouter.route('*')
        .get(function( req, res ){
            res.sendFile(__dirname + '/public/admin.html'); 
        });
    app.use(express.static(__dirname + '/public'));
    app.use('/admin', adminRouter);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
