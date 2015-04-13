(function() {
  var CanvasObjects = [];
  var myRenderer;
  var stage;
  var canvasHeight = 810;
  var canvasWidth = 1000;
  var selectPressed = false;
  var socket = io();
  var movingSelf = false;
  var SocketObject = {};
  var userSessionId = 0;

  window.onload = function() {

    initUserSession();

    initPixie();

    addUI();

    addCiricle();

    //addRect();
    movingSelf = false;

    console.log("Moving state:", movingSelf);
    //drawPolygon();
    //moveObject(stage);
  };

  function initUserSession() {
    console.log("Initiating session");
    // blur screen while we check whether user had logged in before or if session
    // needs to be created

    // sessionStorage.clear();
    //var userSessionKey = sessionStorage.getItem('OpenSketchUserSessionKey');

    // Init Socket IO instance

    var sessionVerification = function() {

    };

    var Session = {
      userId: "",
      sessionKey: "",
      sessionDate: new Date()
    };

    //console.log("Session added");
    //socket.emit('new Session Key', userSessionKey);

    // socket.on('connect To Session', function(sessionId) {
    //   // Create a new Session key using Socket Id
    //   session = {
    //     sessionId: sessionId,
    //     dateLastLoggedIn: new Date()
    //   };

    //   sessionStorage.setItem('OpenSketchUserSessionKey', session);
    // });

  }

  function initPixie() {
    // create an new instance of a pixi stage
    stage = new PIXI.Stage(0x3da8bb);

    var rendererOptions = {
      antialiasing: false,
      transparent: false,
      resolution: 1
    };

    // create a renderer instance
    myRenderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight, rendererOptions);

    // add the renderer view element to the DOM
    //document.body.appendChild(myRenderer.view);
    document.getElementById('whiteboard').appendChild(myRenderer.view);

    // width="1000" height="810px"
  // requestAnimFrame(animate);

  //   function animate() {
  //     requestAnimFrame(animate);
    stage.interactive = true;
    myRenderer.render(stage);
  }

  function addUI() {
    var iconActive = false;

    // Set toolbox button listeners
    var pencilIcon = document.getElementById('pencil');
    var selectIcon = document.getElementById('select');
    var rectIcon = document.getElementById('rectangle');

    pencilIcon.addEventListener('click', function(data) {
      console.log("pencil selected");
      selectPressed = false;
      activatePencil();

    });

    selectIcon.addEventListener('click', function(data) {
      console.log("pressing select");
      selectPressed = true;
      deactivateStage();
    });

    rectIcon.addEventListener('click', function(data) {
      selectPressed = false;
      deactivateStage();
      drawRect();
    });

  }

  SocketObject.emitMoveObject = function(newCoords, curStageIndex) {
    //movingSelf = true;
    console.log("moving object");
    socket.emit('emit moveCanvasObject', {
      newCoords: newCoords,
      stageIndex: curStageIndex
    });

    //movingSelf = false;
  };

  // objectType, startCoords, dimensions, color, curStageIndex
  SocketObject.emitDrawObject = function(objectInfo) {

    //movingSelf = true;
    console.log("emitting draw");
    //if(movingSelf) return;

    socket.emit('emit drawCanvasObject', objectInfo);

    //movingSelf = false;
  };

  SocketObject.emitDrawingObject = function(objectInfo) {
    socket.emit('emit drawingCanvasObject', objectInfo);
  };

  SocketObject.emitObjectMoveDone = function(objectInfo) {
    socket.emit('emit objectMoveDone', objectInfo);
  };

  SocketObject.emitObjectAddDone = function(objectInfo) {
    var shape = {
      userId: userSessionId,
      objectType: objectInfo.objectType,
      position: objectInfo.startCoords,
      rotation: 0,
      fillColor: {
        hexCode: objectInfo.color,
        rgba: objectInfo.color
      }
    };

    switch(objectInfo.objectType) {
      case 'rectangle':
        shape.layerLevel = objectInfo.stageIndex;
        shape.width = objectInfo.dimensions.width;
        shape.height = objectInfo.dimensions.height;
        shape.borderStyle = {
          width: 2,
          color: objectInfo.color
        };
      break;

      case 'drawObject':
        shape.vectors = objectInfo.vectors;
        shape.strokeWidth = objectInfo.dimensions.width;
        shape.layerLevel = objectInfo.layerLevel;
      break;
    }

    socket.emit('emit objectAddDone', shape);
  };

  socket.on('recieve moveCanvasObject', function(moveObjectInfo) {
    //stage.removeChildAt(objectInfo.stageIndex);
    //console.log("object moving", movingSelf);
    console.log(stage.children.length);

    if(movingSelf) {
      return;
    }

    var obj = stage.getChildAt(moveObjectInfo.stageIndex);

    if(obj) {
      //console.log("moving object", moveObjectInfo);
      //console.log(stage.children.length);
      obj.position.x = moveObjectInfo.newCoords.x;
      obj.position.y = moveObjectInfo.newCoords.y;
    }

    myRenderer.render(stage);
  });

  socket.on('recieve drawCanvasObject', function(objectInfo) {
    // localPos, newDimensions, 0xFF0000, curStageIndex
    var Rect = new Rectangle();

    if(movingSelf) {
      movingSelf = false;
      return;
    }

    console.log("recieving drawObject");

    Rect.drawRect(
      objectInfo.startCoords,
      objectInfo.dimensions,
      objectInfo.color,
      objectInfo.stageIndex
    );

  });

  //
  socket.on('recieve drawingCanvasObject', function(objectInfo) {
    if(movingSelf) {
      return;
    }

    // Get object drawn
    if(objectInfo.objectAdded) {
      stage.removeChildAt(objectInfo.stageIndex - 1);
    }

    var Rect = new Rectangle();

    Rect.drawRect(
      objectInfo.startCoords,
      objectInfo.dimensions,
      objectInfo.color,
      objectInfo.stageIndex + 1
    );
  });

  socket.on('get SessionKey', function(session) {

    var userSessionKey = sessionStorage.getItem('OpenSketchUserSessionKey');

    if(userSessionKey) {
      // Check key for date object, and check if it has not expired
      console.log("Old Session key exists", userSessionKey);
      //var curDate = new Date();
      userSessionId = session.sessionId;
      //var diff = ((curDate - userSessionKey.dateLastLoggedIn) / 1000) / 60;
      //console.log("Time diff from last loggin is ", diff);
      socket.emit('old Session Key', userSessionKey);
    }
    else {
      console.log("New session key exists");
      sessionStorage.setItem('OpenSketchUserSessionKey', session);
      userSessionId = session.sessionId;
      socket.emit('new Session Key', 101);
    }

    console.log("Getting key at ", session);
  });

  function drawRect() {
    // var isActive = true;
    var isDown = false;
    var originalCoords;
    var curStageIndex = 0;
    var drawBegan = false;
    var finalGraphics;
    var inverse;
    var Rect = new Rectangle();

    stage.mousedown = function(data) {
      console.log("selected",selectPressed);
      if(selectPressed) return;
      isDown = true;
      data.originalEvent.preventDefault();
      //var graphics = PIXI.Graphics();
      movingSelf = true;
      this.data = data;

      originalCoords = data.getLocalPosition(this);
      curStageIndex = stage.children.length;


      // SocketObject.emitDrawObject({
      //   objectType: 'rectangle',
      //   startCoords: originalCoords,
      //   dimensions: {
      //     width: 1,
      //     height: 1
      //   },
      //   color: 0xFF0000,
      //   stageIndex: curStageIndex + 1
      // });

      console.log("drawing");
    };

    stage.mousemove = function(data) {
      if(isDown) {
        var graphics = new PIXI.Graphics();
        var localPos = data.getLocalPosition(this);
        var newDimensions = {
          width: localPos.x - originalCoords.x,
          height: localPos.y - originalCoords.y
        };
        //movingSelf = true;
        //console.log("new dimensions", newDimensions);

        if(drawBegan) stage.removeChildAt(curStageIndex);

        //finalGraphics = rect.drawRect(originalCoords, newDimensions, 0xFF0000);


        if(newDimensions.width < 0 || newDimensions.height < 0) {
          newDimensions.width = Math.abs(newDimensions.width);
          newDimensions.height = Math.abs(newDimensions.height);
          finalGraphics = Rect.drawRect(localPos, newDimensions, 0xFF0000, curStageIndex);
        }
        else {
          finalGraphics = Rect.drawRect(originalCoords, newDimensions, 0xFF0000, curStageIndex);
        }

        finalGraphics.objectAdded = drawBegan;
        //finalGraphics.stageIndex--;

        console.log("stageIndex", finalGraphics.stageIndex);
        SocketObject.emitDrawingObject(finalGraphics);

        drawBegan = true;
      }
    };

    stage.mouseup = function(data) {
      drawBegan = false;
      isDown = false;
      movingSelf = false;
      // var graphics = new PIXI.Graphics();
      //SocketObject.emitDrawObject(finalGraphics);

      //if(finalGraphics) {
      //  console.log("Final", finalGraphics.getBounds());
      //  finalGraphics.interactive = true;

      //  moveObject(finalGraphics);
      //}

      //socket.emit('add rectangle', );
      //console.log(finalGraphics);

      myRenderer.render(stage);
      SocketObject.emitObjectAddDone(finalGraphics);
    };
  }

  var Rectangle = function () {
    this.fillColor = undefined;
  };

  Rectangle.prototype.drawRect = function(startCoords, dimensions, color, curStageIndex) {
    var graphics = new PIXI.Graphics();
    //var localPos = data.getLocalPosition(this);
    //console.log("adding rect");
    graphics.interactive = true;
    //if(drawBegan) stage.removeChildAt(curStageIndex);

    graphics.beginFill(0xFF0000);

    graphics.drawRect(
      startCoords.x,
      startCoords.y,
      dimensions.width,
      dimensions.height
    );

    moveObject(graphics);
    //inverse = (localPos.x - originalCoords.x < 0) || (localPos.y - originalCoords.y < 0);

    stage.addChild(graphics);

    myRenderer.render(stage);
    console.log(stage.children.length);
    // objectInfo.objectType,
    // objectInfo.startCoords,
    // objectInfo.dimensions,
    // objectInfo.color,
    // objectInfo.stageIndex

    return {
      //userId: userSessionId,
      objectType: 'rectangle',
      startCoords: startCoords,
      dimensions: dimensions,
      color: color,
      stageIndex: curStageIndex  + 1
    };

    // var shape = {
    //   userId: Number,
    //   layerLevel: Number,
    //   position: {
    //     x: Number,
    //     y: Number
    //   },
    //   rotation: Number,
    //   fillColor: {
    //     hexCode: String,
    //     rgba: String
    //   }
    // };
  };

  function addRect() {
    //var rect = new PIXI.drawRect(120,10,100,200);
    var path = [];
    var rect = new Rectangle();
    var curStageIndex = stage.children.length;
    var startCoords = {
      x: canvasWidth*0.75,
      y: 20
    };

    var dimensions = {
      width: 100,
      height: 200
    };

    var graphics = rect.drawRect(startCoords, dimensions, 0xFF0000, curStageIndex);

    // var graphics = new PIXI.Graphics();
    // graphics.interactive = true;

    // //moveObject(graphics, { x: 600*0.75, y: 10 });
    //moveObject(graphics);

    // graphics.beginFill(0xFF0000);
    // graphics.drawRect(canvasWidth*0.75,10,100,200);

    // stage.addChild(graphics);

    // myRenderer.render(stage);
  }

  function addCiricle() {
    var circle = new PIXI.Circle(200,200,40);

    var path = [];
    var graphics = new PIXI.Graphics();
    graphics.interactive = true;

    moveObject(graphics);

    graphics.beginFill(0xFF00FF);

    graphics.drawShape(circle);

    stage.addChild(graphics);

    myRenderer.render(stage);
  }

  function getPolygonBounds(vertices, lineWidth, boundingWidth) {
    var upperBounds = [];
    var lowerBounds = [];

    lineWidth += boundingWidth || 3;

    vertices.forEach(function(point, index, array) {
      if((index+1)%2 === 0)
      // X-Coordinate
      upperBounds.push(point + lineWidth);
      // Y-Coordinate
      lowerBounds.push(point - lineWidth);
    });

    return [upperBounds, lowerBounds];
  }

  function activatePencil() {
    var path = [];

    // var isActive = true;
    var isDown = false;
    var posOld;
    var stageIndex = 0;
    var lines = 0;

    stage.mousedown = function(data) {
      //if(!isActive) return;
      isDown = true;
      lines = 0;
      path = [];
      console.log("mousedown");
      posOld = [data.global.x, data.global.y];
      path.push(posOld[0],posOld[1]);
      stageIndex = stage.children.length - 1;
      //graphics.moveTo(data.global.x, data.global.y);
    };

    stage.mousemove = function(data) {
      //if(!isActive) return;
      if(!isDown) return;
      var graphics = new PIXI.Graphics().lineStyle(2, 0xFF0000);
      //path.push(data.global.y);
      //var newPosition = this.data.getLocalPosition(this.parent);
      graphics.moveTo(posOld[0], posOld[1]);
      //console.log(data.global.x, data.global.y);
      graphics.lineTo(data.global.x, data.global.y);
      posOld = [data.global.x, data.global.y];
      path.push(posOld[0],posOld[1]);
      lines++;
      stage.addChild(graphics);

      myRenderer.render(stage);
    };

    stage.mouseup = function() {
      isDown = false;

      if(!path.length) return;
      //graphics.lineStyle(5, 0xFF0000);
      //graphics.moveTo(path[0][0], path[0][1]);
      //graphics.drawPolygon(path);
      while(lines) {
        stage.removeChildAt(stageIndex + lines);
        lines--;
      }

      var graphics = new PIXI.Graphics().lineStyle(2, 0xFF0000);
      var pencilObject = {
        _id: CanvasObjects.length + 1,
        objectType: 'drawObject',
        startCoords: {
          x: path[0],
          y: path[1]
        },
        vectors: path,
        dimensions: {
          width: 2,
          height: 0
        },
        color: 0xFF0000,
        layerLevel: stage.children.length + 1
      };

      graphics.drawPolygon(path);

      graphics.interactive = true;

      graphics.hitArea = graphics.getBounds();

      moveObject(graphics, { x: graphics.hitArea.x, y: graphics.hitArea.y });

      stage.addChild(graphics);

      CanvasObjects.push(pencilObject);

      myRenderer.render(stage);

      SocketObject.emitObjectAddDone(pencilObject);
    };
  }

  function deactivateStage() {
    stage.mousedown = null;
    stage.mousemove = null;
    stage.mouseup = null;
  }

  function moveObject(graphics, inverse) {
    var selected = false;
    var orginial;

    graphics.mousedown = graphics.touchstart = function(data)
    {
      if(!selectPressed) return;
      data.originalEvent.preventDefault();

      this.data = data;
      orginial = data.getLocalPosition(this);
      this.alpha = 0.9;
      selected = true;

      var graphicsData = this.graphicsData;
      //console.log(graphicsData[0].shape.width);

      myRenderer.render(stage);
      //console.log(data.getLocalPosition(obj));
      //obj.position = obj.toLocal(data.getLocalPosition(obj));
      // obj.y += 20;
    };

    graphics.mousemove = function(data)
    {
      if(selected) {
        var newPosition = this.data.getLocalPosition(this.parent);
        movingSelf = true;
        //if(inverse) {
          // this.position.x = orginial.x - newPosition.x;
          // this.position.y = orginial.y - newPosition.y;
        //}
        // else {
          this.position.x = newPosition.x - orginial.x;
          this.position.y = newPosition.y - orginial.y;
        // }
        var newPos = {
          x: this.position.x,
          y: this.position.y
        };

        console.log(newPosition);
        SocketObject.emitMoveObject(newPos, stage.getChildIndex(this));

        //this.position = newPosition;
        //console.log(this.data.global.x, this.data.global.y);
        myRenderer.render(stage);
      }
    };

    graphics.mouseup = graphics.mouseupoutside = graphics.touchend = graphics.touchendoutside = function(data) {
      if(!selectPressed) return;
      selected = false;
      this.alpha = 1;
      //this.dragging = false;

      // set the interaction data to null
      this.data = null;
      movingSelf = false;
      myRenderer.render(stage);

      SocketObject.emitObjectMoveDone(stage.getChildIndex(this));
    };
  }
})();
