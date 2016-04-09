var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    context.beginPath();
	context.moveTo(100,100);
	context.lineTo(150,100);
	context.lineTo(150,150);
	context.lineTo(100,150);
	context.lineTo(100,100);
    context.fillStyle = "green";
    context.fill();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;