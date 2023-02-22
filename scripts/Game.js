import { Player } from "./Player.js";
import { Obstacle } from "./Obstacle.js";

export class Game
{
	constructor(canvas)
	{
		this.canvas = canvas;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.obstacles = [];
		this.numberOfobstacles = 4;
		this.topMargin = 260;
		this.mouse = {
			x: this.width * 0.5,
			y: this.height * 0.5,
			down: false
		}
		this.player = new Player(this);

		/*
		Event handlers:
		1. We use arrow function rather than a normal callback because callback functions runs on eventListeners
		they lose their context which leads lose "this" keyword context. 
		Arraow function automatically inherit the reference to "this" keyword from the parent scope.
		2. We need to use offsetX and offsetY properties ranther than x and y properties 
		to get the correct position of click events from canvas not from window
		*/
		this.canvas.addEventListener('mousedown', (e) => {
			this.mouse.x = e.offsetX;
			this.mouse.y = e.offsetY;
			this.mouse.down = true;
		});
		this.canvas.addEventListener('mouseup', (e) => {
			this.mouse.x = e.offsetX;
			this.mouse.y = e.offsetY;
			this.mouse.down = false;
		});
		this.canvas.addEventListener('mousemove', (e) => {
			if (this.mouse.down)
			{
				this.mouse.x = e.offsetX;
				this.mouse.y = e.offsetY;
			}
		});
	}

	checkCollision(objectA, objectB)
	{
		const	deltaX = objectA.collisionX - objectB.collisionX;
		const	deltaY = objectA.collisionY - objectB.collisionY;
		const	distance = Math.hypot(deltaY, deltaX);
		const	sumOfRadius = objectA.collisionRadius + objectB.collisionRadius;
		return {
			'isColliding': (distance < sumOfRadius),
			'distance': distance,
			'sumOfRadius': sumOfRadius,
			'deltaX': deltaX,
			'deltaY': deltaY
		};
	}
	
	initObstacles()
	{
		let		attempts = 0;
		const	MAX_ATTEMPTS = 500;
		while (attempts < MAX_ATTEMPTS && this.obstacles.length < this.numberOfobstacles)
		{
			let	testObstacle = new Obstacle(this);
			let	isOverlap = false;
			this.obstacles.forEach(obstacle => {
				const	distanceBuffer = 100;
				const	dx = testObstacle.collisionX - obstacle.collisionX;
				const	dy = testObstacle.collisionY - obstacle.collisionY;
				const	distance = Math.hypot(dy, dx);
				const	sumOfRadius = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer;
				if (distance < sumOfRadius)
				isOverlap = true;
			});
			const	MARGIN = testObstacle.collisionRadius * 1.5;
			if (!isOverlap && testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.width
				&& testObstacle.collisionY > this.topMargin + MARGIN && testObstacle.collisionY < this.height - MARGIN)
				this.obstacles.push(testObstacle);
			attempts++;
		}
	}

	render(context)
	{
		this.obstacles.forEach(obstacle => obstacle.draw(context));
		this.player.draw(context);
		this.player.update();
	}

	init()
	{
		this.initObstacles();
	}
}