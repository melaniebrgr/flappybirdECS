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