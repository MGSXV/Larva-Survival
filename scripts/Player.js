import { Object } from "./Object.js";

export class Player extends Object
{
	constructor(game)
	{
		super(game);
		super.collisionX = this.game.width * .5;
		super.collisionY = this.game.height * .5;
		super.collisionRadius = 30;
		super.speedModifier = 30;
		super.image = document.getElementById('bull');
		this.spriteWidth = 255;
		this.spriteHeight = 255;
		super.width = this.spriteWidth;
		super.height = this.spriteHeight;
		super.spriteX = this.collisionX - this.width * .5;
		super.spriteY = this.collisionY - this.height * .5 - 100;
	}

	draw(context)
	{
		context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
		super.draw(context);
	}

	obstacleCollisionHandler()
	{
		this.game.obstacles.forEach(obstacle => {
			let	collisionInfo = this.game.checkCollision(obstacle, this);
			if (collisionInfo['isColliding'])
			{
				const	unit_x = collisionInfo['deltaX'] / collisionInfo['distance'];
				const	unit_y = collisionInfo['deltaY'] / collisionInfo['distance'];
				this.collisionX = obstacle.collisionX - (collisionInfo['sumOfRadius'] + 1) * unit_x;
				this.collisionY = obstacle.collisionY - (collisionInfo['sumOfRadius'] + 1) * unit_y;
			}
		});
	}

	updatePlayerImage()
	{
		const	angle = Math.atan2(this.deltaY, this.deltaX);
		if (angle < -2.74 || angle > 2.74) this.frameY = 6;
		else if (angle < -1.96) this.frameY = 7;
		else if (angle < -1.17) this.frameY = 0;
		else if (angle < -.39) this.frameY = 1;
		else if (angle < .39) this.frameY = 2;
		else if (angle < 1.17) this.frameY = 3;
		else if (angle < 1.96) this.frameY = 4;
		else if (angle < 2.74) this.frameY = 5;
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
		
		this.obstacleCollisionHandler();
		super.spriteX = this.collisionX - this.width * .5;
		super.spriteY = this.collisionY - this.height * .5 - 100;
		this.updatePlayerImage();
	}
}