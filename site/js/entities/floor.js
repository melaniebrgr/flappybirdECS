var graphicsComponent = require("../components/graphics/floor");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var rectSizingComponent = require("../components/size/rect");

var Floor = function() {
    var canvas = document.getElementById('main-canvas');
    var canvasWidth = canvas.clientWidth/canvas.clientHeight;

	var size = new rectSizingComponent.RectSizingComponent(canvasWidth, 0.01);

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -canvasWidth/2;
	physics.position.y = -0.01;

    // var graphics = new graphicsComponent.FloorGraphicsComponent(this, size.size);

    var collision = new collisionComponent.RectCollisionComponent(this, size.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        // graphics: graphics,
        physics: physics,
        collision: collision
    };
    console.log('Floor:', this);
};

Floor.prototype.onCollision = function(entity) {
    console.log('Floor collided with', entity);
};

exports.Floor = Floor;