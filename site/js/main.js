var flappyBird = require('./flappy_bird');
console.log('1');
if(document.readyState == 'complete')
{
	console.log('2');
  var app = new FlappyBird.flappyBird();
  app.run();
}
else
{
console.log('3');
  document.addEventListener('DOMContentLoaded', function() {
    var app = new FlappyBird.flappyBird();
    app.run();
  });
}