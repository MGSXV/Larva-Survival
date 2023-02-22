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

	update()
	{
		let	collisionObjects = [this.game.player, ...this.game.obstacles];
		super.spriteX = this.collisionX - this.width * .5;
		super.spriteY = this.collisionY - this.width * .5 - 30;
		collisionObjects.forEach(object => {
			let	collisionInfo = this.game.checkCollision(this, object);
			if (collisionInfo['isColliding'])
			{
				const	unit_x = collisionInfo['deltaX'] / collisionInfo['distance'];
				const	unit_y = collisionInfo['deltaY'] / collisionInfo['distance'];
				this.collisionX = object.collisionX + (collisionInfo['sumOfRadius'] + 1) * unit_x;
				this.collisionY = object.collisionY + (collisionInfo['sumOfRadius'] + 1) * unit_y;
			}
		});
	}
}