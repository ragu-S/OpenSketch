module.exports = function() {
  var mongoose = require('mongoose');

  var mongodbUri = 'mongodb://localhost/test';
  //mongodb://localhost/test
  mongoose.connect(mongodbUri);

  var connection = mongoose.connection;

  return connection;
};
