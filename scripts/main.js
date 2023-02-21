import { Game } from "./Game.js";

window.addEventListener('load', function() {
	const	canvas = document.getElementById('main-canvas');
	const	context = canvas.getContext('2d');

	canvas.width = 1280;
	canvas.height = 720;
	context.fillStyle = 'white';
	context.lineWidth = 3;
	context.strokeStyle = 'white';

	const	game = new Game(canvas);
	console.log(game);
	game.render(context);
	function	animate()
	{

	}
});