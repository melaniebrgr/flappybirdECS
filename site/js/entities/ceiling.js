var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var rectSizingComponent = require("../components/size/rect");

var Ceiling = function() {
    var canvas = document.getElementById('main-canvas');
    var canvasWidth = canvas.clientWidth/canvas.clientHeight;

	var size = new rectSizingComponent.RectSizingComponent(canvasWidth, 0.01);

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -canvasWidth/2;
    // Place slightly higher than canvas height so does not collide with pipes
	physics.position.y = 1.005;

    var collision = new collisionComponent.RectCollisionComponent(this, size.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        collision: collision
    };
};

Ceiling.prototype.onCollision = function(entity) {
    // console.log('Ceiling collided with', entity);
};

exports.Ceiling = Ceiling;