var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
    this.size = {
    	x: 0.1,
    	y: 0.38
    };
};

PipeGraphicsComponent.prototype.draw = function(context) {
	var position = this.entity.components.physics.position;
	var location = this.entity.components.location;
	
	context.save()

    context.fillStyle = "green";
	context.translate(position.x - this.size.x/2, position.y);
	context.fillRect(0, 0, this.size.x, this.size.y);

    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;