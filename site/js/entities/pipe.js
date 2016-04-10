var graphicsComponent = require("../components/graphics/pipe");

var Pipe = function() {
    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    this.components = {
        graphics: graphics
    };
};

exports.Pipe = Pipe;