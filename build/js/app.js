(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: positionA.x - positionB.x,
                y: positionA.y - positionB.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var clamp = function(value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;

    var closest = {
        x: clamp(positionA.x, positionB.x,
                 positionB.x + sizeB.x),
        y: clamp(positionA.y, positionB.y,
                 positionB.y + sizeB.y)
    };


    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x;
    var rightA = positionA.x + sizeA.x;
    var bottomA = positionA.y;
    var topA = positionA.y + sizeA.y;

    var leftB = positionB.x;
    var rightB = positionB.x + sizeB.x;
    var bottomB = positionB.y;
    var topB = positionB.y + sizeB.y;

    // Log edges of colliding rectangles
    // if (!(leftA > rightB || leftB > rightA || bottomA > topB || bottomB > topA)) {
    //     console.log('A:', this.entity);
    //     console.log('B:', entity);
    //     console.log('leftA:', leftA);
    //     console.log('rightA:', rightA);
    //     console.log('bottomA:', bottomA);
    //     console.log('topA:', topA);
    //     console.log('leftB:', leftB);
    //     console.log('rightB:', rightB);
    //     console.log('bottomB:', bottomB);
    //     console.log('topB:', topB);
    // }

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],3:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],4:[function(require,module,exports){
var FloorGraphicsComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
};

FloorGraphicsComponent.prototype.draw = function(context) {
	var position = this.entity.components.physics.position;
	
	context.save()

    context.fillStyle = "pink";
	context.translate(position.x, position.y);
	context.fillRect(0, 0, this.size.x, this.size.y);

    context.restore();
};

exports.FloorGraphicsComponent = FloorGraphicsComponent;
},{}],5:[function(require,module,exports){
var PipeGraphicsComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
};

PipeGraphicsComponent.prototype.draw = function(context) {
	var position = this.entity.components.physics.position;
	var location = this.entity.components.location;
	
	context.save()

    context.fillStyle = "green";
	context.translate(position.x, position.y);
	context.fillRect(0, 0, this.size.x, this.size.y);

    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],6:[function(require,module,exports){
var IdComponent = function() {
	this.id = this.getId();
}

IdComponent.prototype.getId = function() {
	return (new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
};

exports.IdComponent = IdComponent;
},{}],7:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };

    this.velocity = {
        x: 0,
        y: 0
    };
    
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],8:[function(require,module,exports){
var RectSizingComponent = function(x, y) {
	this.size = {
		x: x,
		y: y
	}
};

RectSizingComponent.prototype.randomY = function(increment) {
    var increment = increment ? increment : 0;
	var max = this.size.y + increment;
	var min = this.size.y + increment/4;
	var ranY = Math.random() * (max - min) + min;
	this.size.y = ranY > 0.41 ? 0.41 : ranY;
};

exports.RectSizingComponent = RectSizingComponent;
},{}],9:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");

var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -0.8;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Bird.prototype.onCollision = function(entity) {
    // Bird specific collisions here
};

exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":7}],10:[function(require,module,exports){
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
},{"../components/collision/rect":2,"../components/physics/physics":7,"../components/size/rect":8}],11:[function(require,module,exports){
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

	// var graphics = new graphicsComponent.FloorGraphicsComponent(this, size.size);

    var collision = new collisionComponent.RectCollisionComponent(this, size.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
    	id: id,
        physics: physics,
        // graphics: graphics,
        collision: collision
    };    
}

Detector.prototype.onCollision = function(entity) {
    // Detector specific collision events
    // console.log('Detector id:', this.components.id);
};

exports.Detector = Detector;
},{"../components/collision/rect":2,"../components/graphics/floor":4,"../components/id/id":6,"../components/physics/physics":7,"../components/size/rect":8,"./pipe":13}],12:[function(require,module,exports){
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var rectSizingComponent = require("../components/size/rect");

var Floor = function() {
    var canvas = document.getElementById('main-canvas');
    var canvasWidth = canvas.clientWidth/canvas.clientHeight;

	var size = new rectSizingComponent.RectSizingComponent(canvasWidth, 0.01);

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -canvasWidth/2;
    // Place slightly lower than canvas height so does not collide with pipes
	physics.position.y = -0.0105;

    var collision = new collisionComponent.RectCollisionComponent(this, size.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        collision: collision
    };
};

Floor.prototype.onCollision = function(entity) {
    // console.log('Floor collided with', entity);
};

exports.Floor = Floor;
},{"../components/collision/rect":2,"../components/physics/physics":7,"../components/size/rect":8}],13:[function(require,module,exports){
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
},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/physics":7,"../components/size/rect":8}],14:[function(require,module,exports){
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
},{"../components/collision/rect":2,"../components/physics/physics":7,"../components/size/rect":8,"./pipe":13}],15:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputsSystem = require('./systems/inputs');
var userInterfaceSystem = require('./systems/ui');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var floor = require('./entities/floor');
var ceiling = require('./entities/ceiling');
var wallLeft = require('./entities/wallLeft');
var detector = require('./entities/detector');

var FlappyBird = function() {
    this.entities = [new bird.Bird(), new floor.Floor(), new ceiling.Ceiling(), new wallLeft.WallLeft(), new pipe.Pipe('top'), new pipe.Pipe('bottom'), new detector.Detector()];
    this.graphics = new graphicsSystem.GraphicsSystem(this);
    this.physics = new physicsSystem.PhysicsSystem(this);
    this.inputs =  new inputsSystem.InputSystem(this);
    this.ui = new userInterfaceSystem.UserInterfaceSystem(this);
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
},{"./entities/bird":9,"./entities/ceiling":10,"./entities/detector":11,"./entities/floor":12,"./entities/pipe":13,"./entities/wallLeft":14,"./systems/graphics":18,"./systems/inputs":19,"./systems/physics":20,"./systems/ui":21}],16:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

function launchFB() {
	var app = new flappyBird.FlappyBird();
	app.run();

	// window.setTimeout(app.reset.bind(app), 3000);
}

if(document.readyState == 'complete') {
	launchFB();
} else {
  document.addEventListener('DOMContentLoaded', function() {
	launchFB();
  });
}
},{"./flappy_bird":15}],17:[function(require,module,exports){
var wallLeft = require('../entities/wallLeft');
var bird = require('../entities/bird');
var detector = require('../entities/detector');
var WallLeft = wallLeft.WallLeft;
var Bird = bird.Bird;
var Detector = detector.Detector;

var CollisionSystem = function(app) {
    this.app = app;
    this.entities = app.entities;
    // this.count = 0;
    this.currentDetectorId;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if ('collision' in entityA.components == false) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if ('collision' in entityB.components == false) {
                continue;
            }
            // first determines the type of collision (circle-circle, square-square, circle-square)
            // then does the appropriate calculation that returns a boolean indicating whether a collision occured
            if (entityA.components.collision.collidesWith(entityB) == false) {
                continue;
            }

            // runs any entity specific methods on collision
            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);   
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }

            if (entityA instanceof WallLeft || entityB instanceof WallLeft) {
                this.deletePipes();
                continue;
            }

            if (entityA instanceof Bird && entityB instanceof Detector) {
                if (this.currentDetectorId !== entityB.components.id.id) {
                    this.currentDetectorId = entityB.components.id.id;
                    this.app.ui.updateScore();
                }
                continue;
            }

            this.reset();
        }
    }
};

CollisionSystem.prototype.reset = function() {
    this.app.reset();
};

CollisionSystem.prototype.deletePipes = function() {
    this.entities.splice(4,3);
};

exports.CollisionSystem = CollisionSystem;
},{"../entities/bird":9,"../entities/detector":11,"../entities/wallLeft":14}],18:[function(require,module,exports){
var pipe = require('../entities/pipe');
var detector = require('../entities/detector');

var GraphicsSystem = function(app) {
    this.entities = app.entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.increment = 0;
};

GraphicsSystem.prototype.run = function() {    
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
    window.setTimeout(this.addPipes.bind(this), 3000);
};

GraphicsSystem.prototype.addPipes = function() {
        this.entities.push(new pipe.Pipe('top', this.increment), new pipe.Pipe('bottom', this.increment), new detector.Detector());
        this.increment += 0.025;

        var delay = 2000 - (this.increment * 5000);
        delay = delay < 1000 ? 1000 : delay;
        window.setTimeout(this.addPipes.bind(this), delay);   
}

GraphicsSystem.prototype.tick = function() {
    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if ('graphics' in entity.components == false) {
            continue;
        }
        entity.components.graphics.draw(this.context);
    }
    this.context.restore();

    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.reset = function() {
    this.entities.splice(4,this.entities.length);
    this.increment = 0;
    this.entities[0].components.physics.position.y = 0.5;
    this.entities[0].components.physics.velocity.y = 0;
};

exports.GraphicsSystem = GraphicsSystem;
},{"../entities/detector":11,"../entities/pipe":13}],19:[function(require,module,exports){
var InputSystem = function(app) {
    this.entities = app.entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('touchstart', this.onTouch.bind(this), false);
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.37;
};

InputSystem.prototype.onTouch = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.37;
}

exports.InputSystem = InputSystem;
},{}],20:[function(require,module,exports){
var collisionSystem = require("./collision");

var PhysicsSystem = function(app) {
    this.entities = app.entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(app);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000/60);
};

PhysicsSystem.prototype.tick = function() {
    this.collisionSystem.tick();
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if ('physics' in entity.components == false) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":17}],21:[function(require,module,exports){
var UserInterfaceSystem = function(app) {
	this.app = app;
	this.count = 0;
};

UserInterfaceSystem.prototype.updateScore = function() {
    this.count++;
    var score = document.getElementById('score');
    score.innerHTML = ''+this.count;
};

exports.UserInterfaceSystem = UserInterfaceSystem;
},{}]},{},[16]);
