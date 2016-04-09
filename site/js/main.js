var flappyBird = require('./flappy_bird');

if(document.readyState == 'complete') {
  var app = new flappyBird.FlappyBird();
  app.run();
} else {
  document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
  });
}