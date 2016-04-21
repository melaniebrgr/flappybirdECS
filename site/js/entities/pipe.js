var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var rectSizingComponent = require("../components/size/rect");

var Pipe = function(location, increment) {
    var canvas = document.getElementById('main-canvas');
    var canvasWidth = canvas.clientWidth/canvas.clientHeight;

    var size = new rectSizingComponent.RectSizingComponent(0.1, 0.22);
    if (increment) size.randomY(increment);

    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = canvasWidth/2;
    physics.velocity.x = -0.4;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this, size.size);
    var collision = new collisionComponent.RectCollisionComponent(this, size.size);
    collision.onCollision = this.onCollision.bind(this);

    var location = location || 'bottom';
    if (location === 'top') physics.position.y = 1 - size.size.y;

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision,
        location: location
    };
};

Pipe.prototype.onCollision = function(entity) {
    // Pipe specific collision events
};

exports.Pipe = Pipe;