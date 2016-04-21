var graphicsComponent = require("../components/graphics/floor");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var rectSizingComponent = require("../components/size/rect");
var pipe = require("./pipe");
var idComponent = require("../components/id/id");

var Detector = function() {
	var id = new idComponent.IdComponent();

	var size = new rectSizingComponent.RectSizingComponent(0.01, 1);

	var pipeRef = new pipe.Pipe('top');
	var pipeWidth = pipeRef.components.graphics.size.x;

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = pipeRef.components.physics.position.x + pipeWidth + 0.001;
    physics.velocity.x = pipeRef.components.physics.velocity.x;

	var graphics = new graphicsComponent.FloorGraphicsComponent(this, size.size);

    var collision = new collisionComponent.RectCollisionComponent(this, size.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
    	id: id,
        physics: physics,
        collision: collision,
        graphics: graphics
    };    
}

Detector.prototype.onCollision = function(entity) {
    // Detector specific collision events
    // console.log('Detector id:', this.components.id);
};

exports.Detector = Detector;