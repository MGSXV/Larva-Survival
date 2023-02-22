import { Object } from "./Object.js";

export class Egg extends Object
{
	constructor(game)
	{
		super(game);
		super.collisionRadius = 50;
		this.margin = this.collisionRadius * 2;
		super.collisionX = this.margin + Math.random() * (this.game.width - this.margin * 2);
		super.collisionY = this.game.topMargin + Math.random() * (this.game.height - this.game.topMargin - this.margin * .7);
		super.image = document.getElementById('egg');
		super.spriteWidth = 110;
		super.spriteHeight = 135;
		super.width = this.spriteWidth;
		super.height = this.spriteHeight;
		super.spriteX = this.collisionX - this.width * .5;
		super.spriteY = this.collisionY - this.width * .5 - 30;
	}

	draw(context)
	{
		context.drawImage(this.image, this.spriteX, this.spriteY);
		super.draw(context);
	}
}