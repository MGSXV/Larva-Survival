import { Player } from "./Player.js";

export class Game
{
	constructor(canvas)
	{
		this.canvas = canvas;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.player = new Player(this);
	}

	render(context)
	{
		this.player.draw(context);
	}
}