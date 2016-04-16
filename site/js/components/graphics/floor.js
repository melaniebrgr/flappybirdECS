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