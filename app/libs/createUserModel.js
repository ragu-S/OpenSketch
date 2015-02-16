var User = require('./User');

var userDbHelper = {
  // Create functionality
  createUser: function(firstname, lastname) {
    var user = new User({
      firstname: firstname,
      lastname: lastname
    });

    user.save(function(err) {
      if(err) throw err;
    });

    console.log('User saved successfully');
  },

  // Update functionality
  updateUser: function(user) {

  },

  // Retrieve functionality
  retrieveUser: function(user) {

  }
};

module.exports = userDbHelper;



