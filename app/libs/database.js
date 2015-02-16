module.exports = function() {
  var mongoose = require('mongoose');

  var mongodbUri = 'mongodb://opensketch_user:opensktech@ds043981.mongolab.com:43981/open_sketch';

  mongoose.connect(mongodbUri);

  var connection = mongoose.connection;

  return connection;
};
