var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('touchstart', this.onTouch.bind(this), false);
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.37;
};

InputSystem.prototype.onTouch = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.37;
}

exports.InputSystem = InputSystem;