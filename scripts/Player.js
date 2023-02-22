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
	}

	draw(context)
	{
		context.drawImage(this.image, this.collisionX, this.collisionY);
		super.draw(context);
		context.beginPath();
		context.moveTo(this.collisionX, this.collisionY);
		context.lineTo(this.game.mouse.x, this.game.mouse.y);
		context.stroke();
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
	}
}