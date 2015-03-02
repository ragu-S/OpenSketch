var express = require("express");
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/app/public')); // set the static files location /public/img will be /img for users

app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;

app.set('views', __dirname + '/app/public');

require('./app/libs/database')();

// Where actual routes are
require('./app/routes')(app);
require('./app/routeHandlers/userRoutes')(app);
// user routes

// authentication/session routes

// canvas routes

// Set up tests
//require('tests/assertions')();


// Start node app
app.listen(port);

console.log("Server running on port " + port);

exports = module.exports = app;

