import { Object } from "./Object.js";

export class Obstacle extends Object
{
	constructor(name)
	{
		super(name);
		this.collisionX = Math.random() * this.game.width;
		this.collisionY = Math.random() * this.game.height;
		this.collisionRadius = 60;
	}

	draw(context)
	{
		super.draw(context);
	}
}