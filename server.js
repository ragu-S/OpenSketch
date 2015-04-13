var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app); // create Http server
var io = require('socket.io')(http); // add socket io instance
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);

var conf = {
  db: {
    db: 'OpenSketchDb',
    host: 'localhost'
    //port: 27017,
    //port: 6646,  // optional, default: 27017
    //username: 'admin', // optional
    //password: 'secret', // optional
    //collection: 'Test', // optional, default: sessions
  },
  secret: 'opensketch123456',
  expiryTime: 900000 // set for 15mins
};

app.use(cookieParser());

app.use(session({
  store: new MongoStore(conf.db),
  secret: conf.secret,
  maxAge: conf.expiryTime, // set for 15mins
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/app/public')); // set the static files location /public/img will be /img for users


app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;

app.set('views', __dirname + '/app/public');

require('./app/libs/database')(conf);

// Where actual routes are
//require('./app/routes')(app);
//require('./app/routeHandlers/userRoutes')(app);
// user routes



// authentication/session routes

// canvas session routes
//require('./app/routeHandlers/canvasSessionRoutes')(app);

// Set up Socket Listeners
//require('./app/socketHandlers/socket')(io);

// Set up tests
//require('tests/assertions')();
require('./test')();

// Start node app
//app.listen(port);
http.listen(port, function() {
  console.log("Server running on port " + port);
});

exports = module.exports = app;

