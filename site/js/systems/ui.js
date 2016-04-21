var UserInterfaceSystem = function(app) {
	this.app = app;
	this.count = 0;
};

UserInterfaceSystem.prototype.updateScore = function() {
    this.count++;
    var score = document.getElementById('score');
    score.innerHTML = ''+this.count;
};

exports.UserInterfaceSystem = UserInterfaceSystem;