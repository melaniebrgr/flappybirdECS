var RectSizingComponent = function(x, y) {
	this.size = {
		x: x,
		y: y
	}
};

RectSizingComponent.prototype.randomY = function(increment) {
	var increment = increment ? increment : 0;
	var max = this.size.y + increment;
	var min = this.size.y + increment/4;
	var ranY = Math.random() * (max - min) + min;
	this.size.y = ranY > 0.41 ? 0.41 : ranY;
	console.log('size y:', this.size.y);
};

exports.RectSizingComponent = RectSizingComponent;