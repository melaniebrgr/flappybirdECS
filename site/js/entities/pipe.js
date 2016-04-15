var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var rectSizingComponent = require("../components/size/rect");

var Pipe = function(location, increment) {
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 1.5;
    physics.velocity.x = -0.2;

    var size = new rectSizingComponent.RectSizingComponent(0.1, 0.22);
    size.randomY(increment);

    var graphics = new graphicsComponent.PipeGraphicsComponent(this, size.size);
    var collision = new collisionComponent.RectCollisionComponent(this, size.size);
    collision.onCollision = this.onCollision.bind(this);

    if (location === 'top') physics.position.y = 1 - size.size.y;

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision,
        location: location
    };
};

Pipe.prototype.onCollision = function(entity) {
    // console.log("Pipe collided with entity:", entity);
};

exports.Pipe = Pipe;