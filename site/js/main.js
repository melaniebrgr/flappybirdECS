var flappyBird = require('./flappy_bird');

function launchFB() {
	console.log('3: FB launched');
	var app = new flappyBird.FlappyBird();
	app.run();

	// window.setTimeout(app.reset.bind(app), 3000);
}

if(document.readyState == 'complete') {
	console.log('1: ready state complete');
	launchFB();
} else {
  document.addEventListener('DOMContentLoaded', function() {

	console.log('2: DOMContentLoaded');
	launchFB();
  });
}