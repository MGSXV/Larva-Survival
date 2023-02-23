import { Object } from "./Object.js";

export class Larva extends Object
{
	constructor(game, x, y)
	{
		super(game);
		super.collisionX = x;
		super.collisionY = y;
		super.image = document.getElementById('larva');
		super.spriteWidth = 150;
		super.spriteHeight = 150;
		super.width = this.spriteWidth;
		super.height = this.spriteHeight;
		super.frameY = Math.floor(Math.random() * 2);
		super.speedY = 1 + Math.random();
		super.spriteX = this.collisionX - this.width * .5;
		super.spriteY = this.collisionY - this.height * .5 - 30;
		this.markedForDeletion = false;
	}
	draw(context)
	{
		context.drawImage(this.image, 0, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
		super.draw(context);
	}
	update()
	{
		this.collisionY -= this.speedY;
		this.spriteX = this.collisionX - this.width * .5;
		this.spriteY = this.collisionY - this.height * .5 - 30;
		if (this.collisionY < this.game.topMargin)
		{
			this.markedForDeletion = true;
			this.game.removeGameObject();
			this.game.score++;
		}
		let	collisionObjects = [this.game.player, ...this.game.obstacles, ...this.game.eggs];
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
		this.game.enemies.forEach(enemy => {
			if (this.game.checkCollision(enemy, this)['isColliding'])
			{
				this.markedForDeletion = true;
				this.game.removeGameObject();
				this.game.lostHatchlings++;
			}
		});
	}
}