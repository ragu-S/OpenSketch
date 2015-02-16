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

  app.get('/createUser', function(req, res, next) {
    console.log("user req received");
    res.render('views/CreateUserForm.ejs');
  });

  app.get('/listUsers', function(req, res, next) {
    console.log("listing users");

    //res.status(200).render('views/userList.ejs', {
    userDbHelper.retrieveAll(next);
  }, function(req, res, next) {

    res.render('views/userList.ejs', {
      users: userDbHelper.allUsers
    });
  });

  app.post('/createUser', function(req, res, next) {
    console.log("user req received:", res.firstname);
    console.log("req", req.body.firstname);

    var complexType = {
      entry1: req.body.entry1,
      entry2: req.body.entry2
    };

    userDbHelper.createUser(req.body.firstname, req.body.lastname, complexType);

    var message = "User:" + req.body.firstname + " created successfully";

    res.render('views/UserDetail.ejs', {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
  });

  /* Update routes */
  app.get('/updateUser/:userId', function(req, res, next) {
    console.log("update user: ", req.query.userId);
    console.log("update user: ", req.params.userId);

    res.send("User:" + req.query.id + " updated");
  });

  app.get('/updateUser', function(req, res, next) {
    console.log("Get Request update user");

    userDbHelper.retrieveUser(req, next);

  }, function(req, res, next) {

    res.render('views/updateUser.ejs', {
      user: req.user
    });
  });

  app.post('/updateUser', function(req, res, next) {
    console.log("POST: update user: ", req.query.userId);
    console.log("POST: update user: ", req.params.userId);

    userDbHelper.updateUser(req, next);

    res.send("User: updated");
    // res.status(200).render('views/UserDetail.ejs', {
    //   users: ""
    // });
  });

};





















