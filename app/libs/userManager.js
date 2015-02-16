var User = require('./User');

module.exports = {
  // Create functionality
  createUser: function(req, next) {
    // Check if request has appropriate user information

    // Do security check

    // Create user using Model
    var user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      userComplex: req.body.complexType
    });

    user.save(function(err) {
      if(err) throw err;

      // Pass request with new User's data
      req.newUser = user;

      // Tell node to continue to next request handler
      next();
    });

  },

  // Update functionality
  updateUser: function(req, next) {
    // Check whether request contains userId, else return error

    // Do security check here

    // Query database for user with this Id
    User.findById("54e162b2e9cc430cdcb52c79", function(err, user) {
      if (err) throw err;

      // change the users location
      //user.location = 'uk';
      console.log("User: ", user.firstname);
      // save the user
      // user.save(function(err) {
      //   if (err) throw err;

      //   console.log('User successfully updated!');
      // });
      req.user = user;

      next();
    });
  },

  // Query/Retrieve functionality
  retrieveUser: function(req, next) {
    User.findById("54e162b2e9cc430cdcb52c79", function(err, user) {
      if (err) throw err;

      // change the users location
      //user.location = 'uk';
      console.log("User: ", user.firstname);
      // save the user
      // user.save(function(err) {
      //   if (err) throw err;

      //   console.log('User successfully updated!');
      // });
      req.user = user;

      next();
    });
  },

  retrieveAll: function(req, next) {
    // get all the users
    var userList = [];
    var self = this;

    User.find({}, function(err, users) {
      if (err) throw err;
      console.log(users.length);

      req.allUsers = users;

      next();
    });
  },

  // Delete functionality
  deleteUser: function(req, next) {
    // Check whether request contains userId or info to search for user,
    // else return error

    // Do security check here

    // get the user
    User.find({ username: 'starlord55' }, function(err, user) {
      if (err) throw err;

      // delete him
      user.remove(function(err) {
        if (err) throw err;

        console.log('User successfully deleted!');

        next();
      });
    });
  }

};




