export class Object
{
	constructor(game)
	{
		this.game = game;
		this.collisionX;
		this.collisionY;
		this.collisionRadius = 1;
		this.speedX = 0;
		this.speedY = 0;
		this.deltaX;
		this.deltaY;
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