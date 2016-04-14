var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(location) {
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 1.5;
    physics.velocity.x = -0.2;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    var collision = new collisionComponent.RectCollisionComponent(this, graphics.size);
    collision.onCollision = this.onCollision.bind(this);

    if (location === 'top') physics.position.y = 1 - graphics.size.y;

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision,
        location: location
    };
};

Pipe.prototype.onCollision = function(entity) {
    console.log("Pipe collided with entity:", entity);
    // this.components.physics.position.y += 1.5;
};

exports.Pipe = Pipe;