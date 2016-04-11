var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
    this.height = 0.38;
    this.width = 0.1;
};

PipeGraphicsComponent.prototype.draw = function(context) {
	var position = this.entity.components.physics.position;

	context.save()

    context.fillStyle = "green";
	context.translate(position.x - this.width, 0);
	context.fillRect(0, 0, this.width, this.height);
	context.translate(0, 1-this.height);
	context.fillRect(0, 0, this.width, this.height);

    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;