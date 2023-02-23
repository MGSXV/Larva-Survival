class Particle
{
	constructor(game, x, y, color)
	{
		this.game = game;
		this.collisionX = x;
		this.collisionY = y;
		this.color = color;
		this.radius = Math.floor(Math.random() * 10 + 5);
		this.speedX = Math.random() * 6 - 3;
		this.speedY = Math.random() * 2 + .5;
		this.angle = 0;
		this.angleValue = Math.random() * .1 + .01;
		this.markedForDeletion = false;
	}

	draw(context)
	{
		context.save();
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.collisionX, this.collisionY, this.radius, 0, Math.PI * 2);
		context.fill();
		context.stroke();
		context.restore();
	}
}

export class Firefly extends Particle
{
	update()
	{
		this.angle += this.angleValue;
		this.collisionX += Math.cos(this.angleValue) * this.speedX;
		this.collisionY -= this.speedY;
		if (this.collisionY < -this.radius)
		{
			this.markedForDeletion = true;
			this.game.removeGameObject();
		}
	}
}

export class Spark extends Particle
{
	update()
	{
		this.angle += this.angleValue * .5;
		this.collisionX -= Math.cos(this.angle) * this.speedX;
		this.collisionY -= Math.sin(this.angle) * this.speedY;
	}
}