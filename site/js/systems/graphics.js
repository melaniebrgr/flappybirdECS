var pipe = require('../entities/pipe');

var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {    
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));

    var increment = 0;
    function addPipe() {
        this.entities.push(new pipe.Pipe('top', increment), new pipe.Pipe('bottom', increment));
        increment += 0.025;

        var delay = 2000 - (increment * 5000);
        delay = delay < 1000 ? 1000 : delay;
        window.setTimeout(addPipe.bind(this), delay);
        console.log('delay:', delay);
    }
    // window.setInterval(addPipe.bind(this), 2000);
    window.setTimeout(addPipe.bind(this), 2000);
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

exports.GraphicsSystem = GraphicsSystem;