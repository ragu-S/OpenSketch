// Source http://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018
var exports = module.exports = {};

exports.addition = function(left, right) {
  return left + right;
};

exports.parse = function(args) {
  var options = {};

  for(var i in args) {
    var arg = args[i];

    if(arg.substr(0, 2) === "--") {
      arg = arg.substr(2);

      // Check for equals sign
      if(arg.indexOf("=") !== -1) {
        arg = arg.split("=");
        var key = arg.shift();
        var value = arg.join("=");

        if(/^[0-9]+$/.test(value)) {
          value = parseInt(value, 10);
        }

        options[key] = value;
      }
    }
  }

  exports.scan = function() {

  };

  return options;
};
