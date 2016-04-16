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