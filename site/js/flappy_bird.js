var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputsSystem = require('./systems/inputs');
var userInterfaceSystem = require('./systems/ui');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var floor = require('./entities/floor');
var ceiling = require('./entities/ceiling');
var wallLeft = require('./entities/wallLeft');
var detector = require('./entities/detector');

var FlappyBird = function() {
    this.entities = [new bird.Bird(), new floor.Floor(), new ceiling.Ceiling(), new wallLeft.WallLeft(), new pipe.Pipe('top'), new pipe.Pipe('bottom'), new detector.Detector()];
    this.graphics = new graphicsSystem.GraphicsSystem(this);
    this.physics = new physicsSystem.PhysicsSystem(this);
    this.inputs =  new inputsSystem.InputSystem(this);
    this.ui = new userInterfaceSystem.UserInterfaceSystem(this);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.inputs.run();
};

FlappyBird.prototype.reset = function() {
    this.graphics.reset();
};

exports.FlappyBird = FlappyBird;