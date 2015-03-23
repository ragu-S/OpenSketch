module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log("Connection recieved", socket.id);

    // Adds a new room
    socket.on('createRoom', function(content) {
      // Check active rooms

      socket.join('some room');
      //io.emit('chat message', msg);
    });

    socket.on('old Session Key', function(key) {
      console.log("Join old room");
      // Have socket join old session
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
  });

  exports = module.exports = io;
};
