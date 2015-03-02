module.exports = function(app) {
  // Middleware function to be used for every secure route
  var auth = function(req, res, next) {
    if(!res.isAuthenticated())
      res.send(401);
    else
      next();
  };

  // Database Managers/Helpers
  var userDbHelper = require('./libs/userManager');

  app.get('/', function(req, res, next) {
    console.log("home request received");
    //res.status(200).send("request received");
    res.render('index.ejs');
  });

  // Two ways of stacking middleware request handlers
  // 1)
  app.get('/method1', function(req, res, next) {
    console.log("Request method1");
    req.message = "Message: You called method 1 of handling stacked requests in express";
    req.someProp = "Hidden prop";
    //res.status(200).send(req.message);
    next();
  }, function(req, res, next) {

    res.send(req);
  });

};





















