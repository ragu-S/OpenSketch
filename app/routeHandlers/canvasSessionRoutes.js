module.exports = function(app) {
  // Database Managers/Helpers
  var userDbHelper = require('../libs/userManager');
  var canvasSessionHelper = require('../libs/canvasSessionManager');
  var sessions = [];

  app.get('/createSession', function(req, res) {
    // Check if socket is running, else start socket again
    //if(!io) return;
    res.render('views/CreateUserForm.ejs');
    // Create a new session
    //
  });

  app.post('/createSession', function(req, res, next) {
    if(req.body.username) {
      res.render('views/OpenSketch.ejs', { username: req.body.username });
    }
    else {
      res.render('views/CreateUserForm.ejs');
    }
  });

  // app.get('/session', function(req, res, next) {
  //   console.log("session req received");

  //   res.render('views/OpenSketch.ejs');
  // });

  app.get('/session:sessionId', function(req, res, next) {
    console.log("session with Id req received");

    //res.render('views/CreateUserForm.ejs');
    res.render('views/OpenSketch.ejs');
  });


};
