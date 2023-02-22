import { Player } from "./Player.js";

export class Game
{
	constructor(canvas)
	{
		this.canvas = canvas;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.mouse = {
			x: this.width * 0.5,
			y: this.height * 0.5,
			down: false
		}
		this.player = new Player(this);

		/*
		Event handlers:
		1. We use arrow function rather than a normal callback because callback functions runs on eventListeners
		they lose their context which leads lose "this" keyword context. 
		Arraow function automatically inherit the reference to "this" keyword from the parent scope.
		2. We need to use offsetX and offsetY properties ranther than x and y properties 
		to get the correct position of click events from canvas not from window
		*/
		this.canvas.addEventListener('mousedown', (e) => {
			this.mouse.x = e.offsetX;
			this.mouse.y = e.offsetY;
			this.mouse.down = true;
		});
		this.canvas.addEventListener('mouseup', (e) => {
			this.mouse.x = e.offsetX;
			this.mouse.y = e.offsetY;
			this.mouse.down = false;
		});
		this.canvas.addEventListener('mousemove', (e) => {
			if (this.mouse.down)
			{
				this.mouse.x = e.offsetX;
				this.mouse.y = e.offsetY;
			}
		});
	}

	render(context)
	{
		this.player.draw(context);
		this.player.update();
	}
}