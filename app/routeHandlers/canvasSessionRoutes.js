module.exports = function(app) {
  // Database Managers/Helpers
  var userDbHelper = require('../libs/userManager');
  var canvasSessionHelper = require('../libs/canvasSessionManager');
  var sessions = [];

  app.get('/createSession', function(req, res, next) {
    // Check if socket is running, else start socket again
    //if(!io) return;
    //res.render('views/CreateUserForm.ejs');
    // if(!req.session.openSketchSessions) {
    //   req.session.openSketchSessions = [{
    //     sessionKey: 101
    //   }];
    // }
    // else {
    //   // ensure session is valid

    // }
    res.render('views/OpenSketch.ejs');

    // Create a new session
    //
  });

  app.post('/createSession', function(req, res, next) {
    if(req.body.username) {
      res.render('views/OpenSketch.ejs', { username: req.body.username });
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
