var User = require('./User');

module.exports = {
  // Create functionality
  createCanvasSession: function(req, next) {
    // Check if request has appropriate Session information

    // Do security check

    // Create user using Model
    var canvasSession = new CanvasSession({

    });

    user.save(function(err) {
      if(err) throw err;

      // Pass request with new User's data
      //req.newUser = user;

      // Tell node to continue to next request handler
      next();
    });
  },

  // Update functionalities
  // Add User

  // Add CanvasObject

  // Add Message


};
