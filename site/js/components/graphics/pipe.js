var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
    this.height = 1;
    this.width = 0.1;
};

PipeGraphicsComponent.prototype.draw = function(context) {
	context.save()

	context.translate(0.5 - this.width, 0);
    context.fillStyle = "green";
	context.fillRect(0, 0, this.width, this.height);
	context.clearRect(0, 0.5-this.height/8, this.width+1, this.height/4);

    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;