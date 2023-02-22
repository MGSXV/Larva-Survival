import { Object } from "./Object.js";

export class Player extends Object
{
	constructor(game)
	{
		super(game);
		super.collisionX = this.game.width * .5;
		super.collisionY = this.game.height * .5;
		super.collisionRadius = 30;
		this.speedModifier = 50;
	}

	draw(context)
	{
		super.draw(context);
		context.beginPath();
		context.moveTo(this.collisionX, this.collisionY);
		context.lineTo(this.game.mouse.x, this.game.mouse.y);
		context.stroke();
	}
	update()
	{
		this.deltaX = this.game.mouse.x - this.collisionX;
		this.deltaY = this.game.mouse.y - this.collisionY;
		const	distance = Math.hypot(this.deltaY, this.deltaX);
		if (distance > this.speedModifier)
		{
			this.speedX = this.deltaX / distance || 0;
			this.speedY = this.deltaY / distance || 0;
		}
		else
		{
			this.speedX = 0;
			this.speedY = 0;
		}
		this.collisionX += this.speedX * this.speedModifier;
		this.collisionY += this.speedY * this.speedModifier;
	}
}