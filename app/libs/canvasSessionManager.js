var Shape = require('./CanvasShape');

module.exports = {
  // Create functionality
  createCanvasSession: function(req, next) {
    // Check if request has appropriate Session information

    // Do security check

    // Create user using Model
    var canvasSession = new CanvasSession({

    });

    user.save(function(err) {
      if(err) throw err;

      // Pass request with new User's data
      //req.newUser = user;

      // Tell node to continue to next request handler
      next();
    });
  },

  // Add CanvasObject
  addCanvasObject: function(objectInfo) {
    switch(objectInfo.objectType) {
      case 'rectangle':
        console.log("Add rectangle");

        var shape = new Shape({
          userId: objectInfo.userId,
          objectType: objectInfo.objectType,
          layerLevel: objectInfo.layerLevel,
          position: objectInfo.position,
          rotation: 0,
          fillColor: objectInfo.fillColor
        });

        shape.width = objectInfo.width;
        shape.height = objectInfo.height;
        shape.borderStyle = objectInfo.borderStyle;

        shape.save(function(err) {
          if(err) console.log("Error saving shape", shape.userId);
          else
            console.log("Object added to canvas and saved");

        });
        /*
        userId: 'SJczsAhQaUljX7brAAAG',
        objectType: 'rectangle',
        position: { x: 113, y: 348 },
        rotation: 0,
        fillColor: { hexCode: 16711680, rgba: 16711680 },
        layerLevel: 5,
        width: 117,
        height: 100,
        borderStyle: { width: 2, color: 16711680 }
         */
      break;
      case 'ellipse':
      break;
      case 'drawObject':
        console.log("Add rectangle");
      break;
    }
  },

  // Get all CanvasShapes
  getAllObjects: function(canvasSessionId) {

  }

  // Update functionalities
  // Add User

  // Add CanvasObject

  // Add Message

};
