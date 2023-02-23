import { Object } from "./Object.js";

export class Enemy extends Object
{
	constructor(game)
	{
		super(game);
		super.speedX = Math.random() * 3 + .5;
		super.image = document.getElementById('toads')
		super.spriteWidth = 140;
		super.spriteHeight = 260;
		super.width = this.spriteWidth;
		super.height = this.spriteHeight;
		this.collisionX = this.game.width + this.width + Math.random() * this.game.width * .5;
		super.collisionY = this.game.topMargin + Math.random() * (this.game.height - this.game.topMargin);
		super.frameX = Math.floor(Math.random() * 4);
		super.frameY = Math.floor(Math.random() * 4);
	}

	draw(context)
	{
		context.drawImage(this.image, 0, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
		super.draw(context);
	}

	update()
	{
		this.spriteX = this.collisionX - this.width * .5;
		this.spriteY = this.collisionY - this.width * .5 - 150;
		this.collisionX -= this.speedX;
		if (this.spriteX + this.width < 0)
		{
            this.collisionX = this.game.width + this.width + Math.random() * this.game.width * .2;
			this.collisionY = this.game.topMargin + Math.random() * (this.game.height - this.game.topMargin);
        }
		let	collisionObjects = [this.game.player, ...this.game.obstacles];
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