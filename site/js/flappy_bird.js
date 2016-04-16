var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputsSystem = require('./systems/inputs');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
    this.entities = [new bird.Bird(), new pipe.Pipe('top'), new pipe.Pipe('bottom')];
    this.graphics = new graphicsSystem.GraphicsSystem(this);
    this.physics = new physicsSystem.PhysicsSystem(this);
    this.inputs =  new inputsSystem.InputSystem(this);
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