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
		this.numberOfobstacles = 45;
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

	render(context)
	{
		this.player.draw(context);
		this.player.update();
		this.obstacles.forEach(obstacle => obstacle.draw(context));
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
				const	dx = testObstacle.collisionX - obstacle.collisionX;
				const	dy = testObstacle.collisionY - obstacle.collisionY;
				const	distance = Math.hypot(dy, dx);
				const	sumOfRadius = testObstacle.collisionRadius + obstacle.collisionRadius;
				if (distance < sumOfRadius)
					isOverlap = true;
			});
			if (!isOverlap)
				this.obstacles.push(testObstacle);
			attempts++;
		}
	}

	init()
	{
		this.initObstacles();
	}
}