module.exports = function(io) {
  var sessionManager = require('../libs/canvasSessionManager');

  io.on('connection', function(socket) {
    console.log("Connection recieved", socket.id);

    io.emit('get SessionKey', {
      sessionId: socket.id,
      dateLoggedIn: Date.now()
    });

    io.on('old Session Key', function(session) {
      var timeDiff = Date.now() - session.dateLoggedIn;
      console.log("time diff", timeDiff);
    });

    // Adds a new room
    socket.on('createRoom', function(content) {
      // Check active rooms
      //socketConnections.

      socket.join('some room');
      //io.emit('chat message', msg);
    });

    socket.on('old Session Key', function(key) {
      console.log("Join old room", key, "current socketId", socket.id);

      // Have socket join old session

      // Transmit all objects drawn on canvas back to newly connected user

    });

    socket.on('new Session Key', function(sessionKey) {
      console.log("Recieved user session key", sessionKey);
      // Create CanvasSession with this ID
    });

    socket.on('emit moveCanvasObject', function(objectInfo) {

      io.emit('recieve moveCanvasObject', objectInfo);

      console.log("moving object", objectInfo);
    });

    socket.on('emit drawingCanvasObject', function(objectInfo) {
      io.emit('recieve drawingCanvasObject', objectInfo);
    });

    socket.on('emit drawCanvasObject', function(objectInfo) {
      io.emit('recieve drawCanvasObject', objectInfo);
      console.log("moving object", objectInfo);
    });

    // Update DB methods
    socket.on('emit objectMoveDone', function(objectInfo) {
      console.log(objectInfo);
      console.log("Object move saved");
    });

    socket.on('emit objectAddDone', function(objectInfo) {
      console.log(objectInfo);

      sessionManager.addCanvasObject(objectInfo);
    });

  });

  exports = module.exports = io;

  //return socketConnections;
};
