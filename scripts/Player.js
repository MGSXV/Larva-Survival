import { Object } from "./Object.js";

export class Player extends Object
{
	constructor(game)
	{
		super();
		this.game = game;
		super.collisionX = this.game.width * .5;
		super.collisionY = this.game.height * .5;
		super.collisionRadius = 30;
	}

	draw(context)
	{
		context.beginPath();
		context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
		context.save();
		context.globalAlpha = .5;
		context.fill();
		context.restore();
		context.stroke();
	}
}