import { Object } from "./Object.js";

export class Obstacle extends Object
{
	constructor(game)
	{
		super(game);
		super.collisionX = Math.random() * this.game.width;
		super.collisionY = Math.random() * this.game.height;
		super.collisionRadius = 50;
		super.image = document.getElementById('obstacles');
		super.spriteWidth = 250;
		super.spriteHeight = 250;
		super.width = this.spriteWidth;
		super.height = this.spriteHeight;
		super.spriteX = this.collisionX - this.width * .5;
		super.spriteY = this.collisionY - this.width * .5 - 70;
		super.frameX = Math.floor(Math.random() * 4);
		super.frameY = Math.floor(Math.random() * 3);
	}

	draw(context)
	{
		context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
		super.draw(context);
	}
}