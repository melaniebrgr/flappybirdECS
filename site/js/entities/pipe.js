var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Pipe = function() {
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 0.5;
    physics.velocity.x = -0.2;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    var collision = new collisionComponent.RectCollisionComponent(this, {x:0.1, y:0.38});

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

exports.Pipe = Pipe;