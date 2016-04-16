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