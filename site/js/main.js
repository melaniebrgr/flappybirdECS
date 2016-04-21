var flappyBird = require('./flappy_bird');

function launchFB() {
	var app = new flappyBird.FlappyBird();
	app.run();

	// window.setTimeout(app.reset.bind(app), 3000);
}

if(document.readyState == 'complete') {
	launchFB();
} else {
  document.addEventListener('DOMContentLoaded', function() {
	launchFB();
  });
}