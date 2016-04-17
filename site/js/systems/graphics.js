var pipe = require('../entities/pipe');

var GraphicsSystem = function(app) {
    this.entities = app.entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.increment = 0;
};

GraphicsSystem.prototype.run = function() {    
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));

    function addPipe() {
        this.entities.push(new pipe.Pipe('top', this.increment), new pipe.Pipe('bottom', this.increment));
        this.increment += 0.025;

        var delay = 2000 - (this.increment * 5000);
        delay = delay < 1000 ? 1000 : delay;
        window.setTimeout(addPipe.bind(this), delay);
    }
    window.setTimeout(addPipe.bind(this), 3000);
};

GraphicsSystem.prototype.tick = function() {
    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if ('graphics' in entity.components == false) {
            continue;
        }
        entity.components.graphics.draw(this.context);
    }
    this.context.restore();

    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.reset = function() {
    this.entities.splice(4,this.entities.length);
    this.increment = 0;
    this.entities[0].components.physics.position.y = 0.5;
    this.entities[0].components.physics.velocity.y = 0;
};

exports.GraphicsSystem = GraphicsSystem;