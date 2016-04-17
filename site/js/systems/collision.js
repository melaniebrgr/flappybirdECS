var wallLeft = require('../entities/wallLeft');
var WallLeft = wallLeft.WallLeft;

var CollisionSystem = function(app) {
    this.app = app;
    this.entities = app.entities;
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

            this.reset();
        }
    }
};

CollisionSystem.prototype.reset = function() {
    this.app.reset();
};

CollisionSystem.prototype.deletePipes = function() {
    this.entities.splice(4,2);
};

exports.CollisionSystem = CollisionSystem;