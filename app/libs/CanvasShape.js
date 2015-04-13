var mongoose = require('mongoose');

var canvasShape = new mongoose.Schema({
  userId: String,
  objectType: String,
  layerLevel: Number,
  position: {
    x: Number,
    y: Number
  },
  rotation: Number,
  fillColor: {
    hexCode: String,
    rgba: String
  }
});

module.exports = mongoose.model('CanvasShape', canvasShape);

