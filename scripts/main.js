import { Game } from "./Game.js";

window.addEventListener('load', function() {
	const	canvas = document.getElementById('main-canvas');
	const	context = canvas.getContext('2d');

	canvas.width = 1280;
	canvas.height = 720;
	context.fillStyle = 'white';
	context.lineWidth = 3;
	context.strokeStyle = 'black';
	context.font = '40px Helvetica';
	context.textAlign = 'center';

	const	game = new Game(canvas);
	game.init();
	let	lastTime = 0;
	function	animate(timeStamp)
	{
		const	deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		game.render(context, deltaTime);
		requestAnimationFrame(animate);
	}
	animate(lastTime);
});