var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
    this.posX = 50;
};

BirdGraphicsComponent.prototype.draw = function(context) {
	this.posX++;
    context.beginPath();
    context.arc(this.posX, 50, 25, 0, 2 * Math.PI);
    context.arc(this.posX+25, 42, 15, 0, 2 * Math.PI);
    context.fillStyle = "blue";
    context.fill();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;