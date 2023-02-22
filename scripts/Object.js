export class Object
{
	constructor(game)
	{
		this.game = game;
		this.collisionX = 0;
		this.collisionY = 0;
		this.collisionRadius = 1;
		this.speedX = 0;
		this.speedY = 0;
		this.deltaX = 0;
		this.deltaY = 0;
		this.image = null;
		this.spriteWidth = 0;
		this.spriteHeight = 0;
		this.width = this.spriteWidth;
		this.height = this.spriteHeight;
		this.spriteX = 0;
		this.spriteY = 0;
	}

	draw(context)
	{
		context.beginPath();
		context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
		context.save();
		context.globalAlpha = .5;
		context.fill();
		context.restore();
		context.stroke();
	}
	update()
	{

	}
}