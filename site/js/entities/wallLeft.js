var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var rectSizingComponent = require("../components/size/rect");
var pipe = require("./pipe");

var WallLeft = function() {
    var canvas = document.getElementById('main-canvas');
    var canvasWidth = canvas.clientWidth/canvas.clientHeight;

    var pipeRef = new pipe.Pipe('top');
    var pipeWidth = pipeRef.components.graphics.size.x;

	var size = new rectSizingComponent.RectSizingComponent(0.01, 1);

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -canvasWidth/2 - pipeWidth - 0.0105;

    var collision = new collisionComponent.RectCollisionComponent(this, size.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        collision: collision
    };
};

WallLeft.prototype.onCollision = function(entity) {
    // console.log('Floor collided with', entity);
};

exports.WallLeft = WallLeft;