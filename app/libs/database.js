module.exports = function(conf) {
  var mongoose = require('mongoose');

  var mongodbUri = 'mongodb://' +
                   conf.db.host + '/' +
                   conf.db.db;

  //mongodb://localhost/test
  mongoose.connect(mongodbUri);

  var connection = mongoose.connection;

  return connection;
};
