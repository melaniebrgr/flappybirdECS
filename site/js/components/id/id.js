var IdComponent = function() {
	this.id = this.getId();
}

IdComponent.prototype.getId = function() {
	return (new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
};

exports.IdComponent = IdComponent;