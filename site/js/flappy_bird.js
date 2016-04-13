var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputsSystem = require('./systems/inputs');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
    this.entities = [new bird.Bird(), new pipe.Pipe('top'), new pipe.Pipe('bottom')];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.inputs =  new inputsSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.inputs.run();
};

exports.FlappyBird = FlappyBird;